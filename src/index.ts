import { router } from "./router.ts";
import Cache from "./data/cache.ts";
import { port } from "./constants/config.ts";
import { Application, Colors, send } from "./constants/dependencies.ts";
import { CacheData } from "./types.ts";
import { timestamp } from "./data/utils.ts";

const app = new Application();
const cache = new Cache<CacheData>();

/* Load data in different thread so that it doesn't block the http server */
const loader = new Worker(new URL("./data/worker.ts", import.meta.url).href, {
  type: "module",
  deno: true,
});

loader.onmessage = ({ data }: { data: CacheData }) => {
  cache.replace(data);
  console.info(
    Colors.green(
      `🦕 ${timestamp()}: Cache updated. Updated ${cache.getCounter()} times since launch.`,
    ),
  );
};

const refreshCache = () => loader.postMessage(true);

(async () => {
  app.use(router.routes());
  app.use(router.allowedMethods());

  /* Serve the styles */
  app.use(async (ctx, next) => {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/src/client/public`,
      gzip: true,
      brotli: true,
    });
    next();
  });

  app.use((ctx, next) => {
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    return next();
  });

  console.info(Colors.green(`🦕 Server listening on port ${port}!`));
  await app.listen({ port });
})();

const refreshTimer = () => {
  refreshCache();

  setInterval(() => {
    refreshCache();
  }, 120 * 1000);
};

refreshTimer();

export { cache, refreshCache };
