import { createAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AuthLogin } from "../../models/Auth";
import { createAsyncAction } from "typesafe-actions";

/**
 * Signup(회원가입)
 */
// 1. Action Types
// export const AUTH_SIGNUP_START = "signup/AUTH_SIGNUP_START" as const;
// export const AUTH_SIGNUP_SUCCESS = "signup/AUTH_SIGNUP_SUCCESS" as const;
// export const AUATH_SIGNUP_ERROR = "signup/AUATH_SIGNUP_ERROR" as const;

// // 2.Action Creator
// export const authSignupStart = createAction(AUTH_SIGNUP_START);
// export const authSignupSuccess = (authSignup: AuthSignup) => ({
//   type: AUTH_SIGNUP_SUCCESS,
//   payload: authSignup,
// });
// export const authSignupError = (error: Error) => ({
//   type: AUATH_SIGNUP_ERROR,
//   payload: error,
// });

// export type GetAuthActionsType =
//   | ReturnType<typeof authSignupStart>
//   | ReturnType<typeof authSignupSuccess>
//   | ReturnType<typeof authSignupError>;

export const GET_AUTH_LOGIN = "login/GET_AUTH_LOGIN";
export const GET_AUTH_LOGIN_SUCCESS = "login/GET_AUTH_LOGIN_SUCCESS";
export const GET_AUTH_LOGIN_ERROR = "login/GET_AUTH_LOGIN_ERROR";

export const getAuthLogin = createAction(GET_AUTH_LOGIN);
export const getAuthLoginSuccess = (authLogin: AuthLogin) => ({
  type: GET_AUTH_LOGIN_SUCCESS,
  payload: authLogin,
});
export const getAuthLoginError = (error: AxiosError) => ({
  type: GET_AUTH_LOGIN_ERROR,
  payload: error,
});

export const getAuthLoginAsync = createAsyncAction(
  GET_AUTH_LOGIN,
  GET_AUTH_LOGIN_SUCCESS,
  GET_AUTH_LOGIN_ERROR
)<undefined, AuthLogin, AxiosError>();
