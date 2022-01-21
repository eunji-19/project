import axios from "axios";
import BrainService from "../../services/brainService";
import { MODELLIST_FAIL, MODELLIST_SUCCESS, SET_MESSAGE } from "./types";

export const getModelList = (token: string) => async (dispatch: any) => {
  return BrainService.getModelList(token).then(
    (response) => {
      dispatch({
        type: MODELLIST_SUCCESS,
        payload: response,
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
          type: MODELLIST_FAIL,
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
