import { React } from "../../constants/dependencies.ts";
import { colors } from "../../constants/theme.ts";
import { Categories, Colors, ItemAvailability } from "../../types.ts";

interface DataTableProps {
  data: ItemAvailability[];
  category: Categories;
  pages: number;
}

const DataTable: React.FC<DataTableProps> = ({ data, category, pages }) => (
  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>price</th>
          <th>manufacturer</th>
          <th>colors</th>
          <th>availability</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.index}</td>
            <td>{item.name.toLowerCase()}</td>
            <td>{item.price}</td>
            <td>{item.manufacturer}</td>
            <td>
              <ul className="chips">
                {item.color.map((color) => (
                  <li
                    key={`${item.id}-${color}`}
                    style={colors[color] || colors["black"]}
                    className="chip"
                  >
                    {color}
                  </li>
                ))}
              </ul>
            </td>
            <td className="availability">{transformStockValue(item.stock)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <ul className="pagination-buttons">
      {Array.from(Array(pages), (_, i) => (
        <li key={i}>
          <a href={`/${category}/${i * 500}`}>
            {i * 500 + 1}-{i * 500 + 500}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const transformStockValue = (value?: string) => {
  switch (value) {
    case "INSTOCK": {
      return <span style={{ color: "green" }}>in stock</span>;
    }
    case "LESSTHAN10": {
      return <span style={{ color: "#FF8200" }}>less than 10</span>;
    }
    case "OUTOFSTOCK": {
      return <span style={{ color: "red" }}>ouf of stock</span>;
    }
    default: {
      return <span>-</span>;
    }
  }
};

export default DataTable;
