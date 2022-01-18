import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { getAuthSaga } from "../saga/authSaga";
import { getBookSaga } from "../saga/bookSaga";
import { auth } from "./auth";
import book from "./book";
import menuIndex from "./menuIndex";
import selectBook from "./selectBook";

const reducer = combineReducers({ auth, menuIndex, book, selectBook });

export function* rootSaga() {
  yield all([getBookSaga(), getAuthSaga()]);
}

export type RootReducerType = ReturnType<typeof reducer>;

export default reducer;