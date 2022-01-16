import React, { useEffect } from "react";
import BookList from "../components/BookList";
import {
  getBestBookStart,
  getNewBookStart,
  getRecommendBookStart,
} from "../redux/actions/bookActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { BookState } from "../redux/modules/book";
import { MenuIndexState } from "../redux/modules/menuIndex";
const BookListContainer = () => {
  const menuIndex: MenuIndexState = useAppSelector((state) => state.menuIndex);

  const bookState: BookState = useAppSelector((state) => state.book);

  return <BookList bookState={bookState} menuIndex={menuIndex} />;
};

export default BookListContainer;
