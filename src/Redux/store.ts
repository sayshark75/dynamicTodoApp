import { legacy_createStore, combineReducers, compose, applyMiddleware, Store, AnyAction } from "redux";

import thunk, { ThunkDispatch } from "redux-thunk";
import todoReducer from "./todo.reducer";

const rootReducers = combineReducers({
  todo_m: todoReducer,
});

export type AppStore = Omit<Store<rootState, AnyAction>, "dispatch"> & {
  dispatch: ThunkDispatch<rootState, any, AnyAction>;
};

export type rootState = ReturnType<typeof rootReducers>;
export type appDispatch = typeof store.dispatch;

export const store: AppStore = legacy_createStore(rootReducers, compose(applyMiddleware(thunk)));
