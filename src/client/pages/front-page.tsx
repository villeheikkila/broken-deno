import { React } from "../../constants/dependencies.ts";
import { categories } from "../../constants/config.ts";
import Navigation from "../components/navigation.tsx";

const FrontPage: React.FC<{ stats: any }> = ({ stats }) => (
  <>
    <Navigation categories={categories} current={"shirts"} />
    <header>
      <h1>Broken-Deno</h1>
    </header>
    <div className="table-wrapper">
      <h2>Overview</h2>
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
              <td>
                <a href={`/${key.toLowerCase()}`}>{key}</a>
              </td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

export default FrontPage;
