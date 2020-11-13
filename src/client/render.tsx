import template from "./template.ts";
import { cache } from "../index.ts";
import App from "./app.tsx";
import { React, ReactDOM } from "../constants/dependencies.ts";
import { Categories } from "../types.ts";

export const renderCategoryPage = (category: Categories, offset: number) => {
  const data = cache.getPaginated(category, offset)!;
  const pages = cache.getNumberOfPages(category);

  return template(
    ReactDOM.renderToString(
      <App data={data} category={category} pages={pages} />
    )
  );
};