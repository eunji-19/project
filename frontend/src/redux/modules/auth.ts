import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AuthLogin, AuthSignup } from "../../models/Auth";
import AuthService from "../../services/authService";
import { LoginReqType, SignupReqType } from "../../types";
import { getAuthLoginAsync } from "../actions/authActions";
import { RootState } from "../store";

/**
 * 회원가입
 */
export interface AuthSignupState {
  user: AuthSignup[] | null;
  isLoading: boolean;
  error: Error | null;
}

//initialState
export const signupInitialState: AuthSignupState = {
  user: [],
  isLoading: false,
  error: null,
};

export const signUpSlice = createSlice({
  name: "signup",
  initialState: signupInitialState,
  reducers: {
    getSignupStart: (state, action: PayloadAction<AuthSignup>) => {
      state.isLoading = true;
      state.user!.length = 0;
      const newState = state.user!.concat(action.payload);
      state.user = newState;
    },
    getSignupFail: (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error;
    },
    getSignupSuccess: (state, action: PayloadAction<SignupReqType>) => {
      state.isLoading = false;
    },
  },
});

export const signup = signUpSlice.name;
export const auth = signUpSlice.reducer;
export const { getSignupStart, getSignupFail, getSignupSuccess } =
  signUpSlice.actions;

/**
 * 로그인
 */
export interface AuthLoginState {
  user: AuthLogin | null;
  isLoading: boolean;
  error: AxiosError | null;
}

export const loginInitialState: AuthLoginState = {
  user: null,
  isLoading: false,
  error: null,
};

// export const authLogin = createAsyncThunk<
//   // Return type of the payload creator
//   AuthLogin,
//   // First argument to the payload creator
//   LoginReqType,
//   // Types for ThunkAPI
//   {
//     rejectValue: AxiosError;
//   }
// >("users/update", async (reqData, thunkApi) => {
//   const response = await AuthService.login(reqData);
//   if (response.status === 400) {
//     // Return the known error for future handling
//     return thunkApi.rejectWithValue(await response.json());
//   }
//   return (await response.json()) as AuthLogin;
// });

// export const authLoginSlice = createSlice({
//   name: "login",
//   initialState: loginInitialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(authLogin.fulfilled, (state, { payload }) => {
//       //   state.entities[payload.id] = payload;
//       state.user = payload;
//     });
//     builder.addCase(authLogin.rejected, (state, action) => {
//       if (action.payload) {
//         // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
//         state.error = action.payload.response?.data;
//       } else {
//         state.error = JSON.stringify(action.error);
//       }
//     });
//   },
// });

export const authLogin = createAsyncThunk(
  "auth/login",
  async (reqData: LoginReqType, thunkApi) => {
    const response = await AuthService.login(reqData);
    return response;
  }
);

export const authLoginSlice = createSlice({
  name: "login",
  initialState: loginInitialState,
  reducers: {},
});

export const login = authLoginSlice.reducer;
