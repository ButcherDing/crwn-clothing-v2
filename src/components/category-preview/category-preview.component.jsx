import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCategoriesIsLoading } from "../../store/categories/categories.selector";

const CategoryPreview = ({ title, products }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title} onClick={scrollToTop}>
          <span className="title">{title.toUpperCase()}</span>
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
