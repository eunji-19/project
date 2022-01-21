import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth from "./auth";
import book from "./book";
import model from "./brain";
import menuIndex from "./menuIndex";
import message from "./message";
import selectBook from "./selectBook";

const reducer = combineReducers({
  menuIndex,
  book,
  selectBook,
  auth,
  message,
  model,
});

// export function* rootSaga() {
//   yield all([getBookSaga(), getAuthSaga()]);
// }

export type RootReducerType = ReturnType<typeof reducer>;

export default reducer;
