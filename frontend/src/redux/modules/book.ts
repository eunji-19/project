import { AnyAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Book, LikeBook } from "../../models/Book";
import {
  BESTSELLER_FAIL,
  BESTSELLER_SUCCESS,
  LIKEBOOK_FAIL,
  LIKEBOOK_SUCCESS,
  NEW_FAIL,
  NEW_SUCCESS,
  RECOMMEND_FAIL,
  RECOMMEND_SUCCESS,
} from "../actions/types";

export interface BookState {
  books: Book | null;
  isLoading: boolean;
}

const initialState: BookState = {
  books: null,
  isLoading: true,
};

export function book(
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

/**
 * 좋아하는 책 선택 
 */

export interface LikeBookState {
  likeBook: LikeBook | null;
  isLoading: boolean;
  isLikeBookerror: any;
}

const likeInitialState: LikeBookState = {
  likeBook: null,
  isLoading: true,
  isLikeBookerror: null,
};

export function likeBook(
  state: LikeBookState = likeInitialState,
  action: AnyAction
) {
  const { type, payload } = action;
  // console.log("! ", payload);
  switch (type) {
    case LIKEBOOK_SUCCESS: 
      return {
        ...state,
        likeBook: payload,
        isLoading: false,
        error: null,
      };
    case LIKEBOOK_FAIL: 
      // console.log("FAIL ", payload);
      return {
        ...state,
        isLoading: false,
        likeBook: null,
        error: payload,
      };
    default:
      return state;
  }
}