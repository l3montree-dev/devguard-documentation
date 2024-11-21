FROM node:22.11.0@sha256:5c76d05034644fa8ecc9c2aa84e0a83cd981d0ef13af5455b87b9adf5b216561 as builder
LABEL maintainer="Sebastian Kawelke <sebatian.kawelke@l3montree.com"

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

WORKDIR /usr/app/

ENV PORT 3000
EXPOSE 3000

ENV NEXT_PUBLIC_ENVIRONMENT production

COPY package-lock.json .
COPY package.json .

RUN npm ci

COPY . .

ENV NEXT_SHARP_PATH=/usr/app/node_modules/sharp

# Build
RUN npm run build

RUN mkdir -p /usr/app/.next/cache/images && chown -R 53111:53111 /usr/app/.next/cache/images

FROM gcr.io/distroless/nodejs22-debian12:nonroot@sha256:de286271ef771e563194702ff49cc5d60e7ea59a09349cdae129e3b0c6ab396b

USER 53111

WORKDIR /usr/app/
ENV PORT 3000
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder --chown=53111:53111 /usr/app/.next /usr/app/.next
COPY --from=builder /usr/app/node_modules /usr/app/node_modules
COPY --from=builder /usr/app/package.json /usr/app/package.json
COPY --from=builder --chown=53111:53111 /usr/app/public /usr/app/public

CMD [ "./node_modules/next/dist/bin/next", "start" ]
