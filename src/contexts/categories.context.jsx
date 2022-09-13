import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from "../shop-data/shop-data.js";
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils.js";

// actual value you want to access
// const PRODUCTS = SHOP_DATA;
export const CategoriesContext = createContext({
  categoriesMap: {},
});

// provider - the component you want to use to get access to the value
export const CategoriesProvider = ({ children }) => {
  // set up your values (user data)
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);
  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
