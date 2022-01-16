import axios, {AxiosResponse} from "axios";
import {put, call, takeEvery} from 'redux-saga/effects';
import {APP_URL} from "../../configure";
import { getBestBookError, GET_BEST_BOOK_START, getBestBookSuccess, getRecommendBookSuccess, getRecommendBookError, getNewBookSuccess, getNewBookError, GET_RECOMMEND_BOOK_START, GET_NEW_BOOK_START} from "../actions/bookActions";

function* getBestBook() {
    const response: AxiosResponse = yield call(
        () => axios.get(`${APP_URL}/book/best`)
    );
    try {
        yield put(getBestBookSuccess(response.data))
        // yield put(BookService.getBestSeller)
    } catch (err : unknown) {
        if (err instanceof Error) {
            yield put(getBestBookError(new Error(err.message)));
        }
    }
}

function* getRecommendBook() {
    const response: AxiosResponse = yield call(
        () => axios.get(`${APP_URL}/book/recommend`)
    )
    try {
        yield put(getRecommendBookSuccess(response.data));
    } catch (err : unknown) {

        if (err instanceof Error) {
            yield put(getRecommendBookError(new Error(err.message)));
        }
    }
}

function* getNewBook() {
    const response: AxiosResponse = yield call(
        () => axios.get(`${APP_URL}/book/new`)
    )
    try {
        yield put(getNewBookSuccess(response.data));
    } catch (err : unknown) {

        if (err instanceof Error) {
            yield put(getNewBookError(new Error(err.message)));
        }
    }

}

export function* getBookSaga() {
    yield takeEvery(GET_BEST_BOOK_START, getBestBook);
    yield takeEvery(GET_RECOMMEND_BOOK_START, getRecommendBook);
    yield takeEvery(GET_NEW_BOOK_START, getNewBook);
}