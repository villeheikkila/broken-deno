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

export const FrontPage: React.FC<{ stats: any }> = ({ stats }) => (
  <>
    <Navigation categories={categories} current={"shirts"} />
    <header>
      <h1>Welcome to the Broken-Deno</h1>
    </header>
    <div className="stats-table">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats).map(([key, value]: any) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

export default App;
