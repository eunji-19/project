import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import styles from "../css/BookDetail.module.css";
import { Button } from "react-bootstrap";
import { message, Space, Spin } from "antd";

const SelectBook = () => {
  /**
   * 책 상세 내용
   * 로그인 여부 및 사용자 정보
   */
  const bookDetail = useAppSelector((state) => state.getBookDetail);
  const { isLoggedIn, user } = useAppSelector((state) => state.authLogin);
  const { modelLoading, modelError, model } = useAppSelector(
    (state) => state.brainModel
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**
   * 오디오북 들으러가기 & Modal
   */
  const [isAudio, setIsAudio] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <div>
      <div className={styles.app}>
        <div className={styles.details}>
          <div className={styles["big-img"]}>
            <img src={bookDetail.coverLargeUrl!} alt="" />
          </div>
          <div className={styles.box}>
            <div className={styles.row}>
              <h3>{bookDetail.title}</h3>
              <span style={{ fontWeight: "bold" }}>
                {bookDetail.priceStandard}원
              </span>
            </div>
            <p>{bookDetail.content}</p>
            <div style={{ display: "flex" }}>
              <Button
                variant="outline-success"
                onClick={() => {
                  if (!isLoggedIn) {
                    message
                      .info("로그인 후 사용가능")
                      .then(() => navigate("/login"));
                    setIsAudio(false);
                  } else {
                    setIsAudio((prev) => !prev);
                  }
                }}
              >
                오디오북 듣기
              </Button>
              <div style={{ marginLeft: "10px" }}></div>
              <Button
                variant="outline-dark"
                // variant={likeBook ? "success" : "outline-success"}
                onClick={() => {
                  if (!isLoggedIn) {
                    message
                      .info("로그인 후 사용가능")
                      .then(() => navigate("/login"));
                    setIsAudio(false);
                  } else {
                    console.log("HERE");
                  }
                }}
              >
                책 담기
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isAudio && (
        <div className={styles.app}>
          <div style={{ margin: "10px", paddingTop: "20px" }}>
            <h4>😍 모델 선택</h4>
            <div className={styles.box}></div>
            {modelLoading && (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectBook;
