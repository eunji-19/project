import React, { useEffect, useState } from "react";
import BookListNew from "../components/BokListNew";
import BookList from "../components/BookList";
import {
  getBestSeller,
  getNewSeller,
  getRecommendSeller,
} from "../redux/actions/bookActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { BookState } from "../redux/modules/book";
import { MenuIndexState } from "../redux/modules/menuIndex";
import { Spin, Space } from "antd";
import {
  bestSeller,
  newSeller,
  recommendSeller,
} from "../redux/actions/_bookAction";
import BookCategoryList from "../components/BookCategoryList";
import { Button } from "react-bootstrap";

const BookContainer = () => {
  const { title }: MenuIndexState = useAppSelector((state) => state.menuIndex);
  const bookLoading = useAppSelector((state) => state.getBook.bookLoading);
  const book = useAppSelector((state) => state.getBook);
  // const bookState: BookState = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  const fetchBookItem = () => {
    if (title === "BestSeller") {
      dispatch(bestSeller());
    } else if (title === "New") {
      dispatch(newSeller());
    } else {
      dispatch(recommendSeller());
    }
  };

  useEffect(() => {
    fetchBookItem();
  }, [title]);

  return (
    <div>
      {bookLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      ) : (
        <BookCategoryList book={book} />
      )}
    </div>
  );
};

export default BookContainer;
