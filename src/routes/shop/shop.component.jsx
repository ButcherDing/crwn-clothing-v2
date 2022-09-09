import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { ProductsContext } from "../../contexts/products.context";
import "./shop.styles.scss";

const Shop = () => {
  // const { currentUser } = useContext(UserContext);
  const products = useContext(ProductsContext);

  // save context data in a variable, pull it down and replace here to check
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
    </div>
  );
};

export default Shop;
