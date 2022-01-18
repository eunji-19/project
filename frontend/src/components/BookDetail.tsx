import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
import { SelectBookState } from "../redux/modules/selectBook";

const BookDetail = () => {
  const { id } = useParams();
  const selectBookState: SelectBookState = useAppSelector(
    (state) => state.selectBook
  );

  return (
    <div>
      <h3>{selectBookState.title} </h3>
    </div>
  );
};

export default BookDetail;
