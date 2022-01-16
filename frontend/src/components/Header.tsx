import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
  MenuIndexPayload,
  MenuIndexState,
  setMenuIndex,
} from "../redux/modules/menuIndex";
import { BookState } from "../redux/modules/book";
import {
  getBestBookStart,
  getNewBookStart,
  getRecommendBookStart,
} from "../redux/actions/bookActions";

const { Header } = Layout;

const NavHeader = () => {
  // if (window.location.pathname !== "/") return null;

  const menuItem: { key: string; label: string; path: string }[] = [
    { key: "1", label: "BestSeller", path: "/" },
    { key: "2", label: "Recommend", path: "/recommend" },
    { key: "3", label: "New", path: "/new" },
  ];

  const navigate = useNavigate();

  /**
   * MENU Index 설정
   * BOOK 설정
   */
  const menuIndex: MenuIndexState = useAppSelector((state) => state.menuIndex);

  const dispatch = useAppDispatch();

  /**
   * Menu 클릭 시 해당 메뉴 페이지로 이동 및 index값 가져오기 && Book List 가져오기
   */
  const onClickMenu = (item: any) => {
    const clickedMenu = menuItem.find((_item) => _item.key === item.key);
    navigate(clickedMenu!.path);

    const selectMenuIndexPayload: MenuIndexPayload = {
      index: clickedMenu!.key,
      title: clickedMenu!.label,
    };

    dispatch(setMenuIndex(selectMenuIndexPayload));
  };
  console.log("menuIndex", menuIndex);

  return (
    <Layout>
      <Header style={{ background: "#ffffff" }}>
        <div
          style={{
            width: "120px",
            height: "31px",
            margin: "16px 24px 16px 10px",
            float: "left",
            fontSize: 30,
          }}
        >
          <h3>Book</h3>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          style={{ lineHeight: "64px" }}
          selectedKeys={[menuIndex.index]}
          onClick={onClickMenu}
        >
          {menuItem.map((item) => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </Menu>
        {/* <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Link to="/">
            <Menu.Item key="1">베스트셀러</Menu.Item>
          </Link>
          <Link to="/new">
            <Menu.Item key="2">추천도서</Menu.Item>
          </Link>
          <Menu.Item key="3">신규도서</Menu.Item>
        </Menu> */}
      </Header>
    </Layout>
  );
};

export default NavHeader;
