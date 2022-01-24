import React, { useEffect, useState } from "react";
import { LikeBook } from "../models/Book";
import { Model, ModelElement, ModelInfo } from "../models/brain/Model";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import styles from "../css/BookDetail.module.css";
import { Button, Card, Modal } from "react-bootstrap";
import { message, Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { doLikeBook } from "../redux/actions/_bookAction";
import { LikeBookReqType } from "../types";

interface SelectBookProps {
  likeBook: LikeBook;
  model: Model;
}

const _SelectBook: React.FC<SelectBookProps> = ({ likeBook, model }) => {
  const { isLoggedIn, user } = useAppSelector((state) => state.authLogin);
  const bookDetail = useAppSelector((state) => state.getBookDetail);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**
   * 페이지 초기화
   */
  const [init, setInit] = useState(false);
  const initItem = () => {
    if (!likeBook) {
      setCartBook(false);
    } else {
      if (likeBook.statusMessage.existingLikeBook.title === bookDetail.title) {
        setCartBook(true);
      } else {
        setCartBook(false);
      }
    }
    setInit(true);
  };

  useEffect(() => {
    initItem();
  }, []);

  /**
   * 좋아하는 책 & 해당 UI
   */
  const [cartBook, setCartBook] = useState(false);
  function CartUI() {
    if (cartBook) {
      return (
        <Button
          variant="success"
          // variant={likeBook ? "success" : "outline-success"}
          onClick={() => {
            console.log("Click !");
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
            setCartBook(false);
            dispatch(doLikeBook(likeBookReqType));
          }}
        >
          😍좋아하는 책
        </Button>
      );
    } else {
      return (
        <Button
          variant="outline-dark"
          // variant={likeBook ? "success" : "outline-success"}
          onClick={() => {
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
            setCartBook(false);
            dispatch(doLikeBook(likeBookReqType));
            setCartBook(true);
            console.log("cartBOOk ", cartBook);
          }}
        >
          책 담기
        </Button>
      );
    }
  }

  /**
   * 오디오북 들으러가기
   */
  const [isAudio, setIsAudio] = useState(false);

  /**
   * Modal 위해서 필요
   * Video UI 위해서 필요
   */
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <>
      {!init ? (
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
        <div>
          <div className={styles.app}>
            <div className={styles.details}>
              <div className={styles["big-img"]}>
                <img src={bookDetail.coverLargeUrl!} alt="" />
              </div>
              <div className={styles.box}>
                <div className={styles.row}>
                  <h3>{bookDetail.title}</h3>
                  <span>{bookDetail.priceStandard}원</span>
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
                  {isLoggedIn && <>{<CartUI />}</>}
                  {!isLoggedIn && (
                    <Button
                      variant="outline-dark"
                      // variant={likeBook ? "success" : "outline-success"}
                      onClick={() => {
                        message
                          .info("로그인 후 사용가능")
                          .then(() => navigate("/login"));
                        setIsAudio(false);
                      }}
                    >
                      책 담기
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isAudio && (
            <div className={styles.app}>
              <div style={{ margin: "10px", paddingTop: "20px" }}>
                <h4>😍 모델 선택</h4>
                <div className={styles.box}></div>
                {/* <ModelUI /> */}
                {/* <div style={{ display: "flex" }}>
              <ModelUI />
            </div> */}
                {/* {open && (
              <CustomVideoPlay open={open} videoKeyType={videoKeyType} />
            )} */}
                {/* {isValid && <Alert variant="warning">준비중입니다</Alert>} */}
                <Modal
                  show={show}
                  onHide={() => {
                    setShow(false);
                  }}
                  backdrop="static"
                  // keyboard="false"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>오디오북</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>아직 준비중이에요😭</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default _SelectBook;
