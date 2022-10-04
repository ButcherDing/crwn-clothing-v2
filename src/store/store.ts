// This is where all the redux happens, where state lives, where you recieve actions, and where you dispatch into reducers that update state.

import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import { loggerMiddleware } from "./middleware/logger"; // homemade logger
// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// need this to run logger - to have access before changes hit the reducer?
const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

// this is what thunk middleware does
// const thunkMiddleware = (store) => (next) => (action) => {
//   if (typeof action === "function") {
//     action(dispatch);
//   }
// };

const composeEnhancer =
  (process.env.NODE_ENV === "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// need this later in course
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

// root reducer - the overarching reducer
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
//
