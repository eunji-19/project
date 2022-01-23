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

const BookListContainer = () => {
  const { title }: MenuIndexState = useAppSelector((state) => state.menuIndex);
  const bookState: BookState = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  const fetchBookItem = () => {
    dispatch(getBestSeller());
  };

  useEffect(() => {
    fetchBookItem();
    // console.log("tile ", title);
  }, [title]);

  return (
    <div>
      {bookState.isLoading ? (
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
        // <div>ok</div>
        // <BookCondition />
        <BookListNew book={bookState} />
      )}
    </div>
  );
};

export default BookListContainer;
