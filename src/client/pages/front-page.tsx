import { React } from "../../constants/dependencies.ts";
import { categories } from "../../constants/config.ts";
import Navigation from "../components/navigation.tsx";

const FrontPage: React.FC<{ stats: Record<string, number> }> = ({ stats }) => (
  <>
    <Navigation categories={categories} />
    <header>
      <h1>Broken-Deno</h1>
    </header>
    <div className="front-page-table">
      <h2>Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats).map(([key, value]) => (
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
