import { React } from "../../constants/dependencies.ts";
import { Categories, ItemAvailability } from "../../types.ts";

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
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.manufacturer}</td>
            <td>
              {item.color.map((color: string) => (
                <span key={`${item.id}-${color}`} className="chip">
                  {color}
                </span>
              ))}
            </td>
            <td>{transformStockValue(item.stock)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <ul className="pagination-buttons">
      {Array.from(Array(pages), (_, i) => (
        <li key={i}>
          <a href={`/${category}/${i * 500}`}>
            {i * 500}-{i * 500 + 500}
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
