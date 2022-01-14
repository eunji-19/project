import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Auth 초기 상태 타입
 */
interface AuthState {
  user: any;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Action Payload 타입
 */
export type AuthPayload = {
  email: string | null;
  password: string | null;
  nickname: string | null;
  brain_token: string | null;
  access_token: string | null;
};

/**
 * 초기상태
 */
const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

/**
 * Reducer Slice
 */

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Login Reducers
     */
    setLoginPending: (state: AuthState, action: PayloadAction<AuthPayload>) => {
      state.user = { ...state };
      state.isLoggedIn = false;
      state.isLoading = true;
      state.error = null;
    },

    setLoginSuccess: (state: AuthState, action: PayloadAction<AuthPayload>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },

    setLoginFail: (state: AuthState, action: PayloadAction<any>) => {
      state.user = { ...state };
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setLoginPending, setLoginSuccess, setLoginFail } =
  authSlice.actions;
export const getLoginSuccess = (state: RootState) => state.auth.user;
export default authSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import UserService from "../../services/userService";
// import { LoginReqType } from "../../types";
// import { RootState } from "../store";
// //https://www.bezkoder.com/react-redux-login-example-toolkit-hooks/
// //kimyang-sun.tistory.com/entry/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%8D%95%EC%8A%A4-%ED%88%B4%ED%82%B7-%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%82%AC%EA%B0%80-React-Redux-Toolkit-Redux-Saga-TypeScript-Nextjs

// interface AuthState {
//   user: string | null;
//   isLoggedIn: boolean;
//   loading: boolean;
//   error: Error | null;
// }

// const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
//   isLoggedIn: false,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setLoginPending: (state, action) => ({
//       ...state,
//       loading: true,
//       error: null,
//       isLoggedIn: false,
//     }),
//     setLoginSuccess: (state, action) => ({
//       user: action.payload,
//       loading: false,
//       error: null,
//       isLoggedIn: true,
//     }),
//     setLoginFail: (state, action) => ({
//       ...state,
//       loading: false,
//       error: action.payload,
//       isLoggedIn: false,
//     }),
//   },
//   extraReducers: {},
// });

// export const login = createAsyncThunk(
//   "auth/login",
//   async (reqData: LoginReqType, { dispatch, rejectWithValue }) => {
//     try {
//       const data = await UserService.login(reqData);
//       return data;
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         dispatch(setLoginFail(err.message));
//         return rejectWithValue(err.message);
//       }
//     }
//   }
// );

// export const logout = createAsyncThunk("auth/logout", async () => {
//   await UserService.logout();
// });

// export const { setLoginPending, setLoginSuccess, setLoginFail } =
//   authSlice.actions;
// export const getAuthInfo = (state: RootState) => state.auth.user;

// export default authSlice.reducer;
