FROM node:24.14.0@sha256:3a09aa6354567619221ef6c45a5051b671f953f0a1924d1f819ffb236e520e6b AS builder
LABEL maintainer="Sebastian Kawelke <sebatian.kawelke@l3montree.com"

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR /usr/app/

ENV PORT=3000
EXPOSE 3000

ENV NEXT_PUBLIC_ENVIRONMENT=production

COPY package-lock.json .
COPY package.json .

RUN npm ci

COPY . .

ENV NEXT_SHARP_PATH=/usr/app/node_modules/sharp

ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID

ARG NEXT_PUBLIC_UMAMI_URL
ENV NEXT_PUBLIC_UMAMI_URL=$NEXT_PUBLIC_UMAMI_URL

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Build
RUN npm run build

RUN mkdir -p /usr/app/.next/cache/images && chown -R 53111:53111 /usr/app/.next/cache/images

FROM registry.opencode.de/open-code/oci/nodejs:24-main-minimal-amd64@sha256:c34bdc1e4b8d444d5a91fbc650cea4b1eea79405a6e2d843866f34f3127da48d

USER 53111

WORKDIR /usr/app/

ENV PORT=3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=53111:53111 /usr/app/.next /usr/app/.next
COPY --from=builder --chown=53111:53111 /usr/app/node_modules /usr/app/node_modules
COPY --from=builder --chown=53111:53111 /usr/app/package.json /usr/app/package.json
COPY --from=builder --chown=53111:53111 /usr/app/public /usr/app/public

CMD [ "./node_modules/next/dist/bin/next", "start" ]
