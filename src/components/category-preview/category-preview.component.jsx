import ProductCard from "../product-card/product-card.component";
import {
  CategoryPreviewContainer,
  CategoryTitle,
  CategoryItems,
} from "./category-preview.styles.jsx";
import { Link } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <CategoryPreviewContainer>
      <h2>
        <Link to={title} onClick={scrollToTop}>
          <CategoryTitle>{title.toUpperCase()}</CategoryTitle>
        </Link>
      </h2>
      <CategoryItems>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryItems>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
