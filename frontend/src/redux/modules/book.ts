import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

/**
 * book 초기 상태 타입
 */
interface BookState {
    books: any;
    isLoading: boolean;
    error: Error | null;
};

export type BookPayload = {
    books: any | null;
}

const initialState: BookState = {
    books: null,
    isLoading: false,
    error: null
}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBookPending: (state: BookState, action: PayloadAction<BookPayload>) => {
            state.books = { ...state };
            state.isLoading = true;
            state.error = null;
        },
        setBookSuccess: (state: BookState, action: PayloadAction<BookPayload>) => {
            state.books = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setBookFail: (state: BookState, action: PayloadAction<any>) => {
            state.books = { ...state };
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { setBookPending, setBookSuccess, setBookFail } = bookSlice.actions;
export const getBookSuccess = (state: RootState) => state.book;
export default bookSlice.reducer;