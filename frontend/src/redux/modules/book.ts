import {Book} from "../../models/Book";
import {
    GetBooksActionsType,
    GET_BEST_BOOK_START,
    GET_BEST_BOOK_SUCCESS,
    GET_BEST_BOOK_ERROR,
    GET_RECOMMEND_BOOK_START,
    GET_RECOMMEND_BOOK_SUCCESS,
    GET_RECOMMEND_BOOK_ERROR,
    GET_NEW_BOOK_START,
    GET_NEW_BOOK_SUCCESS,
    GET_NEW_BOOK_ERROR
} from "../actions/bookActions";

export interface BookState {
    books: Book | null;
    isLoading: boolean;
    error: Error | null;
};

const initialState: BookState = {
    books: null,
    isLoading: false,
    error: null
}

export default function books(
    state : BookState = initialState,
    action : GetBooksActionsType
): BookState {
    switch (action.type) {
        case GET_BEST_BOOK_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case GET_BEST_BOOK_SUCCESS:
            return {books: action.payload, isLoading: false, error: null};
        case GET_BEST_BOOK_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case GET_RECOMMEND_BOOK_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case GET_RECOMMEND_BOOK_SUCCESS:
            return {books: action.payload, isLoading: false, error: null};
        case GET_RECOMMEND_BOOK_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case GET_NEW_BOOK_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case GET_NEW_BOOK_SUCCESS:
            return {books: action.payload, isLoading: false, error: null};
        case GET_NEW_BOOK_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

// import { createAsyncThunk, createSlice, PayloadAction } from
// "@reduxjs/toolkit" import BookService from "../../services/bookService";
// import { RootState } from "../store"; /**
//  * book 초기 상태 타입
// */ export interface BookState {     books: any;     isLoading: boolean;
// error: Error | null; }; export type BookPayload = {     books: any | null; }
// const initialState: BookState = {     books: null,     isLoading: false,
// error: null } export const bookSlice = createSlice({     name: "book",
// initialState,     reducers: {         setBookPending: (state: BookState,
// action: PayloadAction<BookPayload>) => {             state.books = { ...state
// };             state.isLoading = true;             state.error = null; },
// setBookSuccess: (state: BookState, action: PayloadAction<BookPayload>) => {
// state.books = action.payload; state.isLoading = false;
// state.error = null;         }, setBookFail: (state: BookState, action:
// PayloadAction<any>) => { state.books = { ...state };
// state.isLoading = false; state.error = action.payload;         }     }, });
// export const { setBookPending, setBookSuccess, setBookFail } =
// bookSlice.actions; export const getBookSuccess = (state: RootState) =>
// state.book; export default bookSlice.reducer;