import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { SelectBookState } from "../redux/modules/selectBook";
import styles from "../css/BookDetail.module.css";
import { message, Space, Spin } from "antd";
import { PlayCircleOutlined, CaretDownOutlined } from "@ant-design/icons";
import { getModelList } from "../redux/actions/brainActions";
import { ModelElement } from "../models/Model";
import { Card, Button, ListGroup } from "react-bootstrap";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /**
   * Model List 얻기
   */
  let generateToken: string = "";
  let modelList: ModelElement[] | [] = [];
  const listData: any[] = [];

  /**
   * 오디오북 들으러가기
   */
  const [isAudio, setIsAudio] = useState(false);

  useEffect(() => {
    checkLogin();
    console.log("!user! ", user);
  }, []);

  const checkLogin = () => {
    if (user) {
      generateToken = user.statusMessage.user.generate_token;
      dispatch(getModelList(generateToken));
    }
  };

  if (model) {
    /**
     * clothes, model, language 필수 필요
     */
    modelList = model.statusMessage.models;
    for (let i = 0; i < modelList.length; i++) {
      listData.push({
        imgUrl: modelList[i].clothes[0].imgPath.replace(".png", "_new.png"),
        name: modelList[i].label.ko,
        language: modelList[i].language,
        expertise: modelList[i].expertise.ko,
      });
    }
  }

  const listItems = listData.map((item) => (
    <Card key={item.name} style={{ width: "18rem", margin: "5px" }}>
      <Card.Img variant="top" src={item.imgUrl} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          언어 : {item.language} <br />
          직업 : {item.expertise}
        </Card.Text>{" "}
        <Button variant="outline-secondary">오디오북 듣기</Button>
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
              <Button variant="outline-dark">Add to cart</Button>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
