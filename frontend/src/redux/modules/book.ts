import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "../../configure";
import { Book } from "../../models/Book";
import {
  BESTSELLER_FAIL,
  BESTSELLER_SUCCESS,
  NEW_FAIL,
  NEW_SUCCESS,
  RECOMMEND_FAIL,
  RECOMMEND_SUCCESS,
} from "../actions/types";

export interface BookState {
  books: Book | null;
  isLoading: boolean;
}

// function getInitBookData() {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`${APP_URL}/book/best`)
//       .then((res) => resolve(res.data))
//       .catch((err) => reject(err));
//   });
// }

// getInitBookData().then((response: any) => {
//   initialState = {
//     books: response.statusMessage,
//     isLoading: false,
//   };
// });
const initialState: BookState = {
  books: null,
  isLoading: true,
};

export default function book(
  state: BookState = initialState,
  action: AnyAction
) {
  const { type, payload } = action;

  switch (type) {
    case BESTSELLER_SUCCESS:
      return {
        ...state,
        books: payload.books,
        isLoading: false,
      };
    case BESTSELLER_FAIL:
      return { ...state, isLoading: false };
    case RECOMMEND_SUCCESS:
      return {
        ...state,
        books: payload.books,
        isLoading: false,
      };
    case RECOMMEND_FAIL:
      return { ...state, isLoading: false };
    case NEW_SUCCESS:
      return {
        ...state,
        books: payload.books,
        isLoading: false,
      };
    case NEW_FAIL:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
