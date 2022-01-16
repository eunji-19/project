import { AnyAction } from "redux";
import { call, put, takeEvery } from "redux-saga/effects";
import { AuthSignup } from "../../models/Auth";
import AuthService from "../../services/authService";
import { SignupReqType } from "../../types";
import { authSignupError, authSignupSuccess, AUTH_SIGNUP_START } from "../actions/authActions";
import { getSignupSuccess, getSignupFail, getSignupStart } from "../modules/auth";

/**
 * 회원가입
 */
function* getAuthSignUp({ payload }: AnyAction) {
    console.log("payload ", payload)
    const response: AuthSignup = yield call(AuthService.signUp, payload);
    try {
        yield put(authSignupSuccess(response))
    } catch (err: unknown) {
        if (err instanceof Error) {
            yield put(authSignupError(new Error(err.message)))
        }
    }
}

function* getSignup(action: { payload: SignupReqType }) {
    const params = action.payload;
    try {
        const response: AuthSignup = yield call(AuthService.signUp, params)
        yield put(getSignupStart(response))
    } catch (err: unknown) {
        if (err instanceof Error) {
            yield put(getSignupFail(err))
        }
    }
}

export function* getAuthSaga() {
    // yield takeEvery(AUTH_SIGNUP_START, getAuthSignUp)
    yield takeEvery(getSignupSuccess, getSignup)
}