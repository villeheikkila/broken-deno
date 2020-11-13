import template from "./template.ts";
import { cache } from "../index.ts";
import ProductTables from "./pages/product-tables.tsx";
import FrontPage from "./pages/front-page.tsx";
import { React, ReactDOM } from "../constants/dependencies.ts";
import { Categories } from "../types.ts";

export const renderCategoryPage = (category: Categories, offset: number) => {
  const data = cache.getPaginated(category, offset);
  const pages = cache.getNumberOfPages(category);

  return template(
    ReactDOM.renderToString(
      <ProductTables data={data} category={category} pages={pages} />
    )
  );
};

export const renderFrontPage = () => {
  const stats = cache.getStats();
  return template(ReactDOM.renderToString(<FrontPage stats={stats} />));
};
