import axios from "axios";
import BookService from "../../services/bookService";
import {
  BESTSELLER_FAIL,
  BESTSELLER_SUCCESS,
  NEW_FAIL,
  NEW_SUCCESS,
  RECOMMEND_FAIL,
  RECOMMEND_SUCCESS,
  SET_MESSAGE,
} from "./types";

export const getBestSeller = () => async (dispatch: any) => {
  return BookService.getBestSeller().then(
    (response) => {
      dispatch({
        type: BESTSELLER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response;
        const status = error.response?.status;
        const result = { message, status };
        dispatch({
          type: BESTSELLER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
      }
      return Promise.reject();
    }
  );
};

export const getRecommendSeller = () => async (dispatch: any) => {
  return BookService.getRecommendSeller().then(
    (response) => {
      dispatch({
        type: RECOMMEND_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response;
        const status = error.response?.status;
        const result = { message, status };
        dispatch({
          type: RECOMMEND_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
      }
      return Promise.reject();
    }
  );
};

export const getNewSeller = () => async (dispatch: any) => {
  return BookService.getNewSeller().then(
    (response) => {
      dispatch({
        type: NEW_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response;
        const status = error.response?.status;
        const result = { message, status };
        dispatch({
          type: NEW_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
      }
      return Promise.reject();
    }
  );
};

// import { Book } from "../../models/Book";

// /**
//  * BestSeller
//  */
// export const GET_BEST_BOOK_START = "best/GET_BEST_BOOK_START" as const;
// export const GET_BEST_BOOK_SUCCESS = "best/GET_BEST_BOOK_SUCCESS" as const;
// export const GET_BEST_BOOK_ERROR = "best/GET_BEST_BOOK_ERROR" as const;

// export const getBestBookStart = () => ({ type: GET_BEST_BOOK_START });
// export const getBestBookSuccess = (books: Book) => ({
//   type: GET_BEST_BOOK_SUCCESS,
//   payload: books,
// });
// export const getBestBookError = (error: Error) => ({
//   type: GET_BEST_BOOK_ERROR,
//   payload: error,
// });

// /**
//  * Recommend
//  */
// export const GET_RECOMMEND_BOOK_START =
//   "recommend/GET_RECOMMEND_BOOK_START" as const;
// export const GET_RECOMMEND_BOOK_SUCCESS =
//   "recommend/GET_RECOMMEND_BOOK_SUCCESS" as const;
// export const GET_RECOMMEND_BOOK_ERROR =
//   "recommend/GET_RECOMMEND_BOOK_ERROR" as const;

// export const getRecommendBookStart = () => ({ type: GET_RECOMMEND_BOOK_START });
// export const getRecommendBookSuccess = (books: Book) => ({
//   type: GET_RECOMMEND_BOOK_SUCCESS,
//   payload: books,
// });
// export const getRecommendBookError = (error: Error) => ({
//   type: GET_RECOMMEND_BOOK_ERROR,
//   payload: error,
// });

// /**
//  * NEW
//  */
// export const GET_NEW_BOOK_START = "new/GET_NEW_BOOK_START" as const;
// export const GET_NEW_BOOK_SUCCESS = "new/GET_NEW_BOOK_SUCCESS" as const;
// export const GET_NEW_BOOK_ERROR = "new/GET_NEW_BOOK_ERROR" as const;

// export const getNewBookStart = () => ({ type: GET_NEW_BOOK_START });
// export const getNewBookSuccess = (books: Book) => ({
//   type: GET_NEW_BOOK_SUCCESS,
//   payload: books,
// });
// export const getNewBookError = (error: Error) => ({
//   type: GET_NEW_BOOK_ERROR,
//   payload: error,
// });

// export type GetBooksActionsType =
//   | ReturnType<typeof getBestBookStart>
//   | ReturnType<typeof getBestBookSuccess>
//   | ReturnType<typeof getBestBookError>
//   | ReturnType<typeof getRecommendBookStart>
//   | ReturnType<typeof getRecommendBookSuccess>
//   | ReturnType<typeof getRecommendBookError>
//   | ReturnType<typeof getNewBookStart>
//   | ReturnType<typeof getNewBookSuccess>
//   | ReturnType<typeof getNewBookError>;
