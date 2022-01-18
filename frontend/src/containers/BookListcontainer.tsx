import React from "react";
import BookList from "../components/BookList";
import { useAppSelector } from "../redux/hooks/hooks";
import { BookState } from "../redux/modules/book";
import { MenuIndexState } from "../redux/modules/menuIndex";

const BookListContainer = () => {
  const menuIndex: MenuIndexState = useAppSelector((state) => state.menuIndex);
  const book: BookState = useAppSelector((state) => state.book);

  return <BookList book={book} menuIndex={menuIndex} />;
};

export default BookListContainer;
