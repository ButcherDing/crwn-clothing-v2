import { useContext, Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";
import "./shop.styles.scss";

import CategoryPreview from "../../components/category-preview/category-preview.component";

import CategoriesPreview from "../categories-preview/categories-preview.component";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
    </Routes>
  );
};

export default Shop;
