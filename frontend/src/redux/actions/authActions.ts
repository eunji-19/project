import AuthService from "../../services/authService";
import { LoginReqType, SignupReqType } from "../../types";
import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_MESSAGE,
} from "./types";

//https://www.bezkoder.com/react-hooks-redux-login-registration-example/
export const signUp = (reqData: SignupReqType) => async (dispatch: any) => {
  return AuthService.signUp(reqData).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
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
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: result,
          // payload: message,
        });
      }
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();

      // dispatch({
      //   type: REGISTER_FAIL,
      // });

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });

      return Promise.reject();
    }
  );
};

export const login =
  ({ email, password }: LoginReqType) =>
  (dispatch: any) => {
    return AuthService.login({ email, password }).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response;
          const status = error.response?.status;
          const result = { message, status };
          console.log("result ", result);
          dispatch({
            type: LOGIN_FAIL,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: result,
            // payload: message,
          });
        }
        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        // dispatch({
        //   type: LOGIN_FAIL,
        // });

        // dispatch({
        //   type: SET_MESSAGE,
        //   payload: new Error(error),
        // });

        return Promise.reject();
      }
    );
  };

export const logout = () => (dispatch: any) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
