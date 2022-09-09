import { createContext, useState } from "react";
import SHOP_DATA from "../shop-data/shop-data.json";

// actual value you want to access
const PRODUCTS = SHOP_DATA;
export const ProductsContext = createContext({
  products: [],
});

// provider - the component you want to use to get access to the value
export const ProductsProvider = ({ children }) => {
  // set up your values (user data)
  const [products, setProducts] = useState(PRODUCTS);
  const value = products;

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
