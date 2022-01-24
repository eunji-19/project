import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../models/Book";
import { bestSeller, recommendSeller, newSeller } from "../actions/_bookAction";

export interface BookState {
  books: Book | null;
  bookLoading: boolean;
  bookError: any | null;
}

const bookInitialState: BookState = {
  books: null,
  bookLoading: true,
  bookError: null,
};

const BookSlice = createSlice({
  name: "book",
  initialState: bookInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // 베스트셀러
    builder
      .addCase(bestSeller.pending, (state, action) => {
        state.bookLoading = true;
      })
      .addCase(bestSeller.fulfilled, (state, action) => {
        state.books = action.payload;
        state.bookLoading = false;
        state.bookError = null;
      })
      .addCase(bestSeller.rejected, (state, action: PayloadAction<any>) => {
        state.bookLoading = false;
        state.books = null;
        state.bookError = action.payload;
      })
      // 추천도서
      .addCase(recommendSeller.pending, (state, action) => {
        state.bookLoading = true;
      })
      .addCase(recommendSeller.fulfilled, (state, action) => {
        state.books = action.payload;
        state.bookLoading = false;
        state.bookError = null;
      })
      .addCase(
        recommendSeller.rejected,
        (state, action: PayloadAction<any>) => {
          state.books = null;
          state.bookLoading = false;
          state.bookError = action.payload;
        }
      )
      .addCase(newSeller.pending, (state, action) => {
        state.bookLoading = true;
      })
      .addCase(newSeller.fulfilled, (state, action) => {
        state.books = action.payload;
        state.bookLoading = false;
        state.bookError = null;
      })
      .addCase(newSeller.rejected, (state, action: PayloadAction<any>) => {
        state.books = null;
        state.bookLoading = false;
        state.bookError = null;
      });
  },
});

/**
 * 책 세부사항 넘기기
 */

export interface BookDetail {
  href: string;
  title: string;
  avatar: string;
  content: string;
  coverLargeUrl: string;
  author: string;
  publisher: string;
  customerReviewRank: number;
  priceStandard: number;
  coverSmallUrl: string;
  categoryName: string;
  isbn: string;
}

export type BookDetailPayload = {
  href: string;
  title: string;
  avatar: string;
  content: string;
  coverLargeUrl: string;
  author: string;
  publisher: string;
  customerReviewRank: number;
  priceStandard: number;
  coverSmallUrl: string;
  categoryName: string;
  isbn: string;
};

const selectBookInitialState: BookDetail = {
  href: "",
  title: "",
  avatar: "",
  content: "",
  coverLargeUrl: "",
  author: "",
  publisher: "",
  customerReviewRank: 0,
  priceStandard: 0,
  coverSmallUrl: "",
  categoryName: "",
  isbn: "",
};

const BookDetailSlice = createSlice({
  name: "bookDetail",
  initialState: selectBookInitialState,
  reducers: {
    setBookDetail: (
      state: BookDetail,
      action: PayloadAction<BookDetailPayload>
    ) => {
      state.href = action.payload.href;
      state.title = action.payload.title;
      state.avatar = action.payload.avatar;
      state.content = action.payload.content;
      state.coverLargeUrl = action.payload.coverLargeUrl;
      state.author = action.payload.author;
      state.publisher = action.payload.publisher;
      state.customerReviewRank = action.payload.customerReviewRank;
      state.priceStandard = action.payload.priceStandard;
      state.coverSmallUrl = action.payload.coverSmallUrl;
      state.categoryName = action.payload.categoryName;
      state.isbn = action.payload.isbn;
    },
  },
});

export const { setBookDetail } = BookDetailSlice.actions;

export { BookSlice, BookDetailSlice };
