## Broken Deno

An app that fetches data from a flawed API. Transforms the data to a more suitable format and renders it as pages of tables. The content is server side rendered to plain HTML. The project makes use of web workers so that the server remains responsive even while data is being processed. This also means that Deno needs access to the file system (--allow-read). The unstable flag is required for now because using Deno APIs from web workers is still considered experimental, but the colored console output is irresistible.

### Tech stack

| Technology | Purpose        |
| ---------- | -------------- |
| Deno       | Runtime        |
| Oak        | HTTP server    |
| React      | User interface |

### Guide

To run the service you need to:

1. Install [Deno](https://deno.land/#installation)
2. Clone this repo
3. Run `deno run --allow-net --allow-read --unstable src/index.ts` in the root of the project folder

Or build and and run it as a docker image:

3. `docker build -t broken-deno . && docker run -it --init -p 8000:8000 broken-deno`

You can also run the project from dockerhub

`docker run -it --init -p 8000:8000 villeheikkila/broken-deno:latest`
