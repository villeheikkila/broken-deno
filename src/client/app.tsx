import { React } from "../constants/dependencies.ts";
import Navigation from "./components/navigation.tsx";
import DataTable from "./components/data-table.tsx";
import { categories } from "../constants/config.ts";
import { Categories, ItemAvailability } from "../types.ts";

interface AppProps {
  data: ItemAvailability[];
  category: Categories;
  pages: number;
}

const App: React.FC<AppProps> = ({ data, category, pages }) => (
  <>
    <Navigation categories={categories} current={category} />
    <header>
      <h1>{category}</h1>
    </header>
    <DataTable data={data} category={category} pages={pages} />
  </>
);

export default App;
