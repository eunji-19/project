import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { SelectBookState } from "../redux/modules/selectBook";
import styles from "../css/BookDetail.module.css";
import { message, Space, Spin } from "antd";
import { ModelElement, ModelInfo } from "../models/brain/Model";
import { Card, Button, Collapse, Modal } from "react-bootstrap";
import { LikeBookState } from "../redux/modules/book";
import { getModelList, makeVideoKey } from "../redux/actions/brainActions";
import { LikeBookReqType } from "../types";
import { setLikeBook } from "../redux/actions/bookActions";

const BookDetail = () => {
  const { id } = useParams();
  const selectBookState: SelectBookState = useAppSelector(
    (state) => state.selectBook
  );
  /**
   * 로그인여부 확인
   */
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const { model, isLoading } = useAppSelector((state) => state.model);
  const { videoKey, videoIsLoadig, error } = useAppSelector(
    (state) => state.videoKey
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /**
   * Model List 얻기
   */
  let generateToken: string = "";
  let modelList: ModelElement[] | [] = [];
  const listData: ModelInfo[] = [];

  /**
   * 오디오북 들으러가기
   */
  const [isAudio, setIsAudio] = useState(false);
  const handleClose = () => setShow(false);

  /**
   * Modal 위해서 필요
   * Video UI 위해서 필요
   */
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [videoKeyType, setVideoKeyType] = useState({
    language: "",
    text: "",
    model: "",
    clothes: 0,
    token: "",
  });

  /**
   * 좋아하는 책
   */
  const likeBook: LikeBookState = useAppSelector((state) => state.likeBook);

  useEffect(() => {
    checkLogin();
    console.log("!user! ", user);
  }, []);

  const checkLogin = () => {
    if (user) {
      generateToken = user.statusMessage.user.generate_token;
      console.log("generateToken ", generateToken);
      dispatch(getModelList(generateToken));
    }
  };

  if (model) {
    /**
     * clothes, model, language 필수 필요
     */
    modelList = model.statusMessage.models;
    // console.log("Model List ", modelList);
    for (let i = 0; i < modelList.length; i++) {
      listData.push({
        imgUrl: modelList[i].clothes[0].imgPath.replace(".png", "_new.png"),
        name: modelList[i].label.ko,
        language: modelList[i].language,
        expertise: modelList[i].expertise.ko,
        clothes: modelList[i].clothes,
        modelId: modelList[i].id,
      });
    }
  }

  const listenAudio = (item: ModelInfo) => {
    console.log("item ", item);
    if (item.language[0] !== "ko") {
      setShow(true);
    } else {
      setShow(false);
      setOpen(!open);
      setVideoKeyType({
        language: item.language[0],
        // text: selectBookState.description!,
        text: "이것은 테스트입니다.",
        model: item.modelId,
        token: user.statusMessage.user.generate_token,
        clothes: parseInt(item.clothes[0].id),
      });
    }
  };

  /**
   * Show Model UI
   */
  const listItems = listData.map((item) => (
    <Card key={item.name} style={{ width: "18rem", margin: "5px" }}>
      <Card.Img variant="top" src={item.imgUrl} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          언어 : {item.language} <br />
          직업 : {item.expertise}
        </Card.Text>
        <Button
          variant="outline-secondary"
          onClick={() => {
            listenAudio(item);
          }}
        >
          오디오북
        </Button>
      </Card.Body>
    </Card>
  ));
  // const listItems = listData.map((d) => <li key={d.name}>{d.name}</li>);

  return (
    <div>
      <div className={styles.app}>
        <div className={styles.details}>
          <div className={styles["big-img"]}>
            <img src={selectBookState.largeImageUrl!} alt="" />
          </div>
          <div className={styles.box}>
            <div className={styles.row}>
              <h3>{selectBookState.title}</h3>
              <span>{selectBookState.price}원</span>
            </div>
            <p>{selectBookState.description}</p>
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
                onClick={() => {
                  if (!isLoggedIn) {
                    message
                      .info("로그인 후 사용가능")
                      .then(() => navigate("/login"));
                    setIsAudio(false);
                  } else {
                    const email: string = user.statusMessage.user.email;
                    const reqType: LikeBookReqType = {
                      email: email,
                      title: selectBookState.title!,
                      author: selectBookState.author!,
                      smallImageUrl: selectBookState.smallImageUrl,
                    };
                    console.log("req type ", reqType);
                    dispatch(setLikeBook(reqType));
                    if (likeBook.error) {
                      console.log("error! ", likeBook.error);
                      alert("삭제?");
                    }
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
            {isLoading && (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            )}
            <div style={{ display: "flex" }}>{listItems}</div>
            {/* {open && (
              // <CustomVideoPlay open={open} videoKeyType={videoKeyType} />
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
  );
};

export default BookDetail;
