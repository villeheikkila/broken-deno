
FROM hayd/alpine-deno:1.5.2
EXPOSE 8000
WORKDIR /app
USER deno
COPY ./src/constants/dependencies.ts .
RUN deno cache dependencies.ts
ADD . .
RUN deno cache ./src/index.ts
CMD ["run", "--allow-net", "--allow-read", "--unstable", "./src/index.ts"]