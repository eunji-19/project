import React from "react";

const BookDetail = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  console.log("id ", params);

  return (
    <div>
      <h3>Book Detail </h3>
    </div>
  );
};

export default BookDetail;
