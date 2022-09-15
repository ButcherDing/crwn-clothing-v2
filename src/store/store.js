// This is where all the redux happens, where state lives, where you recieve actions, and where you dispatch into reducers that update state.

import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// need this to run logger - to have access before changes hit the reducer?
const middlewares = [logger];

// need this later in course
const composedEnhancers = compose(applyMiddleware(...middlewares));

// root reducer - the overarching reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);
