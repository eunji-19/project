import axios from "axios";
import BrainService from "../../services/brainService";
import { FindProjectReqType, VideoKeyReqType } from "../../types";
import { FINDPROJECT_FAIL, FINDPROJECT_SUCCEESS, MAKEVIDEO_FAIL, MAKEVIDEO_SUCCESS, MODELLIST_FAIL, MODELLIST_SUCCESS, SET_MESSAGE } from "./types";

/**
 * MODEL LIST 받아오기
 */
export const getModelList = (token: string) => async (dispatch: any) => {
  return BrainService.getModelList(token).then(
    (response) => {
      console.log("model response ", response);
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
        console.log("model error ", result);
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

/**
 * VIDEO KEY 만들때 
 */
export const makeVideoKey = (reqData: VideoKeyReqType) => async (dispatch: any) => {
  return BrainService.getMakeVideoKey(reqData).then((response) => {
    const key = response.statusMessage.data.key;
    console.log("response ", key);
    dispatch({
      type: MAKEVIDEO_SUCCESS,
      payload: { vidoeKey: response}
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
          type: MAKEVIDEO_FAIL,
          paylad: { error: result}
        });

        dispatch({
          type: SET_MESSAGE,
          payload: result,
        });
      }
      return Promise.reject();
    }
  )
}

/**
 * Find Project 할때 
 */
export const findProject = (reqData: FindProjectReqType) => async (dispatch: any) => {
  return BrainService.getFindProject(reqData).then((response) => {
    dispatch({
      type: FINDPROJECT_SUCCEESS,
      payload: { findProject: response }
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
        type: FINDPROJECT_FAIL,
        paylad: { error: result}
      });

      dispatch({
        type: SET_MESSAGE,
        payload: result,
      });
    }
    return Promise.reject();
  }
  )
}