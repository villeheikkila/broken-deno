import { React } from "../../constants/dependencies.ts";
import { Categories } from "../../types.ts";

interface NavigationProps {
  categories: readonly Categories[];
  current: Categories;
}

const Navigation: React.FC<NavigationProps> = ({ categories, current }) => (
  <nav>
    <a href="/front">
      <strong>Broken API</strong>
    </a>
    <ul>
      {categories.map((category) => (
        <li
          key={category}
          className={category === current ? "active" : "inactive"}
        >
          <a href={`/${category}`}>{category}</a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
