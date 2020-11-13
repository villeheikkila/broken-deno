import { router } from "./router.ts";
import Cache from "./data/cache.ts";
import { port } from "./constants/config.ts";
import { Application } from "./constants/dependencies.ts";
import { CacheData } from "./types.ts";

const app = new Application();
const cache = new Cache<CacheData>();

/* Load data in different thread so that it doesn't block during the http server */
const loader = new Worker(new URL("./data/worker.ts", import.meta.url).href, {
  type: "module",
});

loader.onmessage = ({ data }: { data: CacheData }) => {
  cache.replace(data);
  console.log("Cache updated!");
};

const refreshCache = () => loader.postMessage(true);

(async () => {
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.use((ctx, next) => {
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    return next();
  });

  /* Serve the styles */
  app.use(async (context) => {
    await context.send({
      root: `${Deno.cwd()}/src/client/public`,
    });
  });

  console.log(`Server listening on port ${port}!`);
  await app.listen({ port });
})();

const refreshTimer = () => {
  refreshCache();

  setInterval(() => {
    console.log("Refresh started");
    refreshCache();
  }, 60 * 1000);
};

refreshTimer();

export { cache, refreshCache };
