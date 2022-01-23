import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { APP_URL } from "../configure";

interface MyBookType {
  title: string;
  email: string;
  author: string;
  smallImageUrl: string;
}

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [myBook, setMyBook] = useState<MyBookType[]>([]);
  const [loading, setLoading] = useState(true);

  const getMyBook = async () => {
    const email = user.statusMessage.user.email;
    console.log("email ", email);
    const result = await axios.post(`${APP_URL}/book/myBook`, { email: email });
    setMyBook(result.data.statusMessage);
    setLoading(false);
    // await axios
    //   .post(`${APP_URL}/book/myBook`, { email: email })
    //   .then((response) => {
    //     console.log("response ", response.data.statusMessage);
    //     const result = response.data.statusMessage;
    //     setMyBook(result);
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    getMyBook();
  }, []);

  return (
    <div style={{ margin: "10px" }}>
      <div style={{ textAlign: "center" }}>
        <h3>About Our Site / Profile</h3>
        <br />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ margin: "20px" }}>
          <h5>이곳은 책 관련 사이트입니다.</h5>

          <br />
          <span>* Book Site</span>
          <br />
          <span>1. 회원가입 / 로그인 / 로그아웃</span>
          <br />
          <span>2. 카테고리 - 베스트셀러 / 추천도서 / 신규도서</span>
          <br />
          <span>3. 책 상세페이지</span>
          <br />
          <span>4. About & Profile</span>
          <br />
          <br />
          <span>* 함께하고 있는 OPEN API</span>
          <br />
          <span>1. 인터파크 OPEN API와 함께하고 있어요</span>
          <br />
          <span>2. 딥브레인 제공 API도 함께하고 있어요</span>
          <br />
          <span>3. 구성된 API 설명은 여기서 확인 가능해요</span>
          <br />
          <a href="http://localhost:5000/api/docs" target="_blank">
            API DOCS
          </a>
          <br />
          <br />
          <span>* 디자인은 Antd , BootStrap으로 구성되었습니다</span>
          <br />
        </div>

        <Card style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://www.kedglobal.com/data/ked/image/2021/06/15/ked202106150022.700x.0.jpg"
          />
          <Card.Body>
            <Card.Title>
              Welcome, {user.statusMessage.user.nickname}😻
            </Card.Title>
            <Card.Text>
              닉네임: <span>{user.statusMessage.user.nickname}</span>
              <br />
              이메일: <span>{user.statusMessage.user.email}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>{user.statusMessage.user.nickname} 님이 좋아하는 책</div>
      {myBook.length !== 0 && <div style={{ display: "flex" }}></div>}
    </div>
  );
};

export default Profile;
