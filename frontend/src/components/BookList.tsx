import React, { useEffect, useState } from "react";
import { List, Avatar } from "antd";
import Icon from "@ant-design/icons";
import { MenuIndexState } from "../redux/modules/menuIndex";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { BookState } from "../redux/modules/book";
import { Book } from "../models/Book";
import {
  getBestBookStart,
  getNewBookStart,
  getRecommendBookStart,
} from "../redux/actions/bookActions";

interface BookProps {
  menuIndex: MenuIndexState;
  book: BookState;
}

const BookList: React.FC<BookProps> = ({ menuIndex, book }) => {
  // const [bookItme, setBookItem] = useState(null);
  const dispatch = useAppDispatch();
  const listData: any[] | null = [];

  // const getBookItem = (title: string) => {
  //   if (title === "New") {
  //     console.log("New");
  //     dispatch(getNewBookStart());
  //     console.log("book New ", book);
  //   } else if (title === "Recommend") {
  //     console.log("Recommend");
  //     dispatch(getRecommendBookStart());
  //     console.log("book Recommend ", book);
  //   } else {
  //     console.log("else");
  //     dispatch(getBestBookStart());
  //     console.log("book else ", book);
  //   }
  // };

  // useEffect(() => {
  //   console.log("First Loading ");
  //   dispatch(getBestBookStart());
  //   console.log("book ", book);
  // }, [dispatch]);

  // useEffect(() => {
  //   getBookItem(menuIndex.title);
  // }, [dispatch, menuIndex.title]);

  for (let i = 0; i < 23; i++) {
    listData.push({
      // href: "http://ant.design",
      href: "book/1",
      title: `ant design part ${i}`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    });
  }

  return (
    <div style={{ margin: 10 }}>
      <List
        itemLayout="vertical"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <Icon type="setting" title="156" style={{ marginRight: 8 }} />,
              <Icon type="setting" title="156" style={{ marginRight: 8 }} />,
              <Icon type="message" title="156" style={{ marginRight: 8 }} />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              // title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default BookList;
