import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { SelectBookState } from "../redux/modules/selectBook";
import styles from "../css/BookDetail.module.css";
import { Button, message, Space, Spin } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import BrainService from "../services/brainService";
import axios from "axios";
import { APP_URL } from "../configure";
import { getModelList } from "../redux/actions/brainActions";

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
  let generateToken: string = "";

  console.log("!user! ", user);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (user) {
      generateToken = user.statusMessage.user.generate_token;
      dispatch(getModelList(generateToken));
      console.log("model ", model.statusMessage.models);
    }
  };

  return (
    <div>
      <div className={styles.app}>
        <div className={styles.details}>
          <div className={styles["big-img"]}>
            <img src={selectBookState.largeImageUrl!} alt="" />
          </div>
          <div className={styles.box}>
            <div className={styles.row}>
              <h2>{selectBookState.title}</h2>
              <span>{selectBookState.price}원</span>
            </div>
            <p>{selectBookState.description}</p>
            <Button className={styles.cart}>Add to cart</Button>
            <div style={{ margin: "10px", display: "flex" }}>
              <h4>오디오북</h4>
              <PlayCircleOutlined
                style={{ fontSize: "24px", paddingLeft: "10px" }}
                onClick={() => {
                  if (!isLoggedIn) {
                    message
                      .info("로그인 후 사용가능")
                      .then(() => navigate("/login"));
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {isLoggedIn && (
        <div className={styles.app}>
          <div className={styles.details}>
            <h2>모델 선택</h2>
            <div className={styles.box}></div>
            {isLoading && (
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

export default BookDetail;
