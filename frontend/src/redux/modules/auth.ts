import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSignup } from '../../models/Auth';
import { SignupReqType } from '../../types';

export interface AuthSignupState {
    user: AuthSignup[] | null;
    isLoading: boolean;
    error: Error | null;
}

//initialState
export const initialState: AuthSignupState = {
	user: [],
	isLoading: false,
	error: null,
};

export const signUpSlice = createSlice({
	name: 'signup',
	initialState,
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
export const {getSignupStart, getSignupFail, getSignupSuccess} = signUpSlice.actions;