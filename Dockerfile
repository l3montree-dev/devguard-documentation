FROM node:26.5.0@sha256:0473e7dc433a1310f436edee02aa79737ec78a4b345433ab0963d4a256f9ad85 AS builder
LABEL maintainer="Sebastian Kawelke <sebatian.kawelke@l3montree.com"

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN apt-get update && apt-get install -y --no-install-recommends git && rm -rf /var/lib/apt/lists/*

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

ARG NEXT_PUBLIC_DEVGUARD_API_URL
ENV NEXT_PUBLIC_DEVGUARD_API_URL=$NEXT_PUBLIC_DEVGUARD_API_URL

ARG NEXT_PUBLIC_FEEDBACK_SERVER_URL
ENV NEXT_PUBLIC_FEEDBACK_SERVER_URL=$NEXT_PUBLIC_FEEDBACK_SERVER_URL

ARG NEXT_PUBLIC_PROJECT_ID
ENV NEXT_PUBLIC_PROJECT_ID=$NEXT_PUBLIC_PROJECT_ID

ARG NEXT_PUBLIC_CHAT_WIDGET_SRC
ENV NEXT_PUBLIC_CHAT_WIDGET_SRC=$NEXT_PUBLIC_CHAT_WIDGET_SRC

ARG NEXT_PUBLIC_CHAT_WIDGET_INTEGRITY
ENV NEXT_PUBLIC_CHAT_WIDGET_INTEGRITY=$NEXT_PUBLIC_CHAT_WIDGET_INTEGRITY

# Build
RUN npm run build

RUN mkdir -p /usr/app/.next/cache/images && chown -R 53111:53111 /usr/app/.next/cache/images

FROM gcr.io/distroless/nodejs26-debian13:nonroot@sha256:d440510c9ef4ff874b240bb6b855e4de4e797db283e41d8d506da5085a677f26

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
