import { Router, send } from "https://deno.land/x/oak/mod.ts";
import { renderCategoryPage, renderFrontPage } from "./client/render.tsx";
import { refreshCache } from "./index.ts";

const router = new Router();

router.get("/refresh", (context) => {
  refreshCache();
  context.response.body = "Refreshing data!";
});

router.get("/", (context) => {
  context.response.body = renderFrontPage();
});

router.get("/shirts", (context) => {
  context.response.body = renderCategoryPage("shirts", 0);
});

router.get("/shirts/:offset", (context) => {
  const { offset } = context.params;

  if (offset) {
    context.response.body = renderCategoryPage("shirts", parseInt(offset));
  }
});

router.get("/accessories", (context) => {
  context.response.body = renderCategoryPage("accessories", 0);
});

router.get("/accessories/:offset", (context) => {
  const { offset } = context.params;

  if (offset) {
    context.response.body = renderCategoryPage("accessories", parseInt(offset));
  }
});

router.get("/jackets", (context) => {
  context.response.body = renderCategoryPage("jackets", 0);
});

router.get("/jackets/:offset", (context) => {
  const { offset } = context.params;

  if (offset) {
    context.response.body = renderCategoryPage("jackets", parseInt(offset));
  }
});

export { router };
