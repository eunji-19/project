import axios from "axios";
import BookService from "../../services/bookService";
import { LikeBookReqType } from "../../types";
import {
  BESTSELLER_FAIL,
  BESTSELLER_SUCCESS,
  LIKEBOOK_FAIL,
  LIKEBOOK_SUCCESS,
  NEW_FAIL,
  NEW_SUCCESS,
  RECOMMEND_FAIL,
  RECOMMEND_SUCCESS,
  SET_MESSAGE,
} from "./types";

export const getBestSeller = () => async (dispatch: any) => {
  return await BookService.getBestSeller().then(
    (response) => {
      dispatch({
        type: BESTSELLER_SUCCESS,
        payload: { books: response },
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
  return await BookService.getRecommendSeller().then(
    (response) => {
      dispatch({
        type: RECOMMEND_SUCCESS,
        payload: { books: response },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response,
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
  return await BookService.getNewSeller().then(
    (response) => {
      dispatch({
        type: NEW_SUCCESS,
        payload: { books: response },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response,
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

export const setLikeBook = (reqData: LikeBookReqType) => async (dispatch: any) => {
  return BookService.setLikeBook(reqData).then((response) => {
    console.log("Action ", response);
    dispatch({
      type: LIKEBOOK_SUCCESS,
      payload: response.data,
    });

    // dispatch({
    //   type: SET_MESSAGE,
    //   payload: response,
    // });

    return Promise.resolve();
  },
    (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response;
        const status = error.response?.status;
        const result = { message, status };

        console.log("error ", result)
        dispatch({
          type: LIKEBOOK_FAIL,
          payload: result,
        });

        // dispatch({
        //   type: SET_MESSAGE,
        //   payload: result,
        // });
      }
      return Promise.reject();
    }
  )
}