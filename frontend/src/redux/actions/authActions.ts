import {createAction} from "@reduxjs/toolkit";
import {AuthSignup} from "../../models/Auth";

/**
 * Signup(회원가입)
 */
// 1. Action Types
export const AUTH_SIGNUP_START = 'signup/AUTH_SIGNUP_START' as const;
export const AUTH_SIGNUP_SUCCESS = 'signup/AUTH_SIGNUP_SUCCESS' as const;
export const AUATH_SIGNUP_ERROR = 'signup/AUATH_SIGNUP_ERROR' as const;

// 2.Action Creator
export const authSignupStart = createAction(AUTH_SIGNUP_START);
export const authSignupSuccess = (authSignup: AuthSignup) => ({
  type: AUTH_SIGNUP_SUCCESS,
  payload: authSignup
});
export const authSignupError = (error : Error) => (
    {type: AUATH_SIGNUP_ERROR, payload: error}
);

export type GetAuthActionsType =
  | ReturnType<typeof authSignupStart>
  | ReturnType<typeof authSignupSuccess>
  | ReturnType<typeof authSignupError>;
