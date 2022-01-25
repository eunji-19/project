import { combineReducers } from "@reduxjs/toolkit";
import message from "./message";
import auth from "./auth";
import { AuthLoginSlice, AuthSignupSlice } from "./authSlice";
import { book, likeBook } from "./book";
import { model, videoKey } from "./brain";
import menuIndex from "./menuIndex";
import selectBook from "./selectBook";
import { BookSlice, BookDetailSlice, LikeBookSlice } from "./bookSlice";
import { FindProjectSlice, ModelSlice, VideoSlice } from "./brainSlice";

const rootReducer = combineReducers({
  authSignup: AuthSignupSlice.reducer,
  authLogin: AuthLoginSlice.reducer,
  getBook: BookSlice.reducer,
  getBookDetail: BookDetailSlice.reducer,
  getLikeBook: LikeBookSlice.reducer,
  brainModel: ModelSlice.reducer,
  brainVideo: VideoSlice.reducer,
  brainFindProject: FindProjectSlice.reducer,
  menuIndex,
  book,
  likeBook,
  selectBook,
  auth,
  message,
  model,
  videoKey,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;

// import { combineReducers } from "redux";
// import { all } from "redux-saga/effects";
// import auth from "./auth";
// import {book, likeBook} from "./book";
// import {model, videoKey} from "./brain";
// import menuIndex from "./menuIndex";
// import message from "./message";
// import selectBook from "./selectBook";

// const reducer = combineReducers({
//   menuIndex,
//   book,
//   likeBook,
//   selectBook,
//   auth,
//   message,
//   model,
//   videoKey,
// });

// // export function* rootSaga() {
// //   yield all([getBookSaga(), getAuthSaga()]);
// // }

// export type RootReducerType = ReturnType<typeof reducer>;

// export default reducer;
