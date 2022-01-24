import { Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import BookDetail from "../components/BookDetail";
import SelectBook from "../components/SelectBook";
import _SelectBook from "../components/_SelectBook";
import { initLikeBook } from "../redux/actions/_bookAction";
import { brainModel } from "../redux/actions/_brainAction";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { setLikeBookState } from "../redux/modules/bookSlice";
import { LikeBookReqType } from "../types";

const BookDetailContainer = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.authLogin);
  const bookDetail = useAppSelector((state) => state.getBookDetail);
  const { likeBook } = useAppSelector((state) => state.getLikeBook);
  const { model, modelLoading } = useAppSelector((state) => state.brainModel);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  const initItem = () => {
    if (isLoggedIn) {
      console.log("req!! ", loading);
      const email = user!.statusMessage.user.email;
      const likeBookReqType: LikeBookReqType = {
        href: bookDetail.href,
        title: bookDetail.title,
        avatar: bookDetail.avatar,
        content: bookDetail.content,
        coverLargeUrl: bookDetail.coverLargeUrl,
        author: bookDetail.author,
        publisher: bookDetail.publisher,
        customerReviewRank: bookDetail.customerReviewRank,
        priceStandard: bookDetail.priceStandard,
        coverSmallUrl: bookDetail.coverSmallUrl,
        categoryName: bookDetail.categoryName,
        isbn: bookDetail.isbn,
        email: email,
      };

      dispatch(initLikeBook(likeBookReqType));
      console.log("req12 ", likeBook);
      dispatch(brainModel(user!.statusMessage.user.generateToken));
      setLoading(false);
    }
    setLoading(false);
  };
  console.log("req ", loading);

  useEffect(() => {
    initItem();
  }, [dispatch]);

  return (
    <>
      {loading ? (
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
        <_SelectBook likeBook={likeBook!} model={model!} />
        // <div>no</div>
      )}
    </>
  );
  // return <_SelectBook />;
  // return <SelectBook />;
  // return <BookDetail />;
};

export default BookDetailContainer;
