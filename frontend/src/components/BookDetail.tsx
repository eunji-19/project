import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
import { SelectBookState } from "../redux/modules/selectBook";
import styles from "../css/BookDetail.module.css";
import { Button } from "antd";

const BookDetail = () => {
  const { id } = useParams();
  const selectBookState: SelectBookState = useAppSelector(
    (state) => state.selectBook
  );

  console.log(".", selectBookState.largeImageUrl);

  return (
    <div className={styles.app}>
      <div className={styles.details}>
        <div className={styles["big-img "]}>
          <img src={selectBookState.largeImageUrl!} alt="" />
        </div>
        <div className={styles.box}>
          <div className={styles.row}>
            <h2>{selectBookState.title}</h2>
            <span>{selectBookState.price}원</span>
          </div>
          <p>{selectBookState.description}</p>
          <Button className={styles.cart}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
