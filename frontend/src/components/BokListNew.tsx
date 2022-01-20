import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookService from "../services/bookService";
import { List, Avatar } from "antd";
import Icon from "@ant-design/icons";
import {
  SelectBookPayload,
  SelectBookState,
  setSelectBook,
} from "../redux/modules/selectBook";
import { useAppDispatch } from "../redux/hooks/hooks";

const BookListNew = () => {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const listData: any[] | null = [];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    setLoading(true);
    const result = await BookService.getBestSeller();
    if (result) {
      setLoading(false);
      setBook(result.statusMessage.domestic.item);
      console.log("book ", book);
    }
    // await BookService.getBestSeller()
    //   .then((res) => {
    //     const bookList = res.statusMessage.domestic.item;
    //     setBook(res.statusMessage);
    //     setLoading(false);
    //     console.log("list ", book);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     setLoading(false);
    //   });
  };

  return isLoading ? (
    <div>Loading....</div>
  ) : (
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
        renderItem={(item, index) => (
          <List.Item
            // key={item.title}
            key={index}
            actions={[
              <Icon type="setting" title="156" style={{ marginRight: 8 }} />,
              <Icon type="setting" title="156" style={{ marginRight: 8 }} />,
              <Icon type="message" title="156" style={{ marginRight: 8 }} />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src={item[index].coverLargeUrl}
                // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
            onClick={() => {
              const selectBookPayload: SelectBookPayload = {
                title: item[index].title,
                author: item[index].author,
                description: item[index].description,
                price: item[index].priceStandard,
                smallImageUrl: item[index].coverSmallUrl,
                largeImageUrl: item[index].coverLargeUrl,
                categoryName: item[index].categoryName,
              };
              dispatch(setSelectBook(selectBookPayload));
              navigate(`/book/${item[index].isbn}`);
            }}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.title}
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

export default BookListNew;
