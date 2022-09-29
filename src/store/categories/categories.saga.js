import { all, call, put, takeLatest } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export function* fetchCategoriesAsync() {
  try {
    // for yield to work we need generator effect, so we need call: call(func, funcArgs)
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (err) {
    yield put(fetchCategoriesFailed(err));
  }
}

export function* onFetchCategories() {
  // takeLatest gets 2 args - 1) action type to respond to; 2) what will happen?
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
