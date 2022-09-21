// This is where all the redux happens, where state lives, where you recieve actions, and where you dispatch into reducers that update state.

import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// const curryFunc = (a) => (b, c) => {
// a + b - c
// }

// const withA  = curryFunc(3)

// withA(2,4); // 3 + 2 - 4

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

// need this to run logger - to have access before changes hit the reducer?
const middlewares = [loggerMiddleware];

// need this later in course
const composedEnhancers = compose(applyMiddleware(...middlewares));

// root reducer - the overarching reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);

//
