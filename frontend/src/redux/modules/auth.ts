import { AnyAction } from "@reduxjs/toolkit";
import { AuthLogin } from "../../models/Auth";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

// @ts-ignore
const user: AuthLogin = JSON.parse(localStorage.getItem("user"));

export interface AuthLoginState {
  isLoggedIn: boolean;
  user: AuthLogin | null;
}

const initialState: AuthLoginState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };

export default function auth(
  state: AuthLoginState = initialState,
  action: AnyAction
) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
