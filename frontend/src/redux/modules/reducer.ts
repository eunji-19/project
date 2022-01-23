import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth from "./auth";
import {book, likeBook} from "./book";
import {model, videoKey, findProject} from "./brain";
import menuIndex from "./menuIndex";
import message from "./message";
import selectBook from "./selectBook";

const reducer = combineReducers({
  menuIndex,
  book,
  likeBook,
  selectBook,
  auth,
  message,
  model,
  videoKey,
  findProject
});

// export function* rootSaga() {
//   yield all([getBookSaga(), getAuthSaga()]);
// }

export type RootReducerType = ReturnType<typeof reducer>;

export default reducer;
