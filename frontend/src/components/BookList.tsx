import React, { useEffect, useState } from "react";
import { List, Avatar } from "antd";
import Icon from "@ant-design/icons";
import { MenuIndexState } from "../redux/modules/menuIndex";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { BookState } from "../redux/modules/book";
import { BookItem } from "../models/Book";
import {
  getBestBookStart,
  getNewBookStart,
  getRecommendBookStart,
} from "../redux/actions/bookActions";
import {
  SelectBookPayload,
  SelectBookState,
  setSelectBook,
} from "../redux/modules/selectBook";
import { useNavigate } from "react-router-dom";

interface BookProps {
  menuIndex: MenuIndexState;
  book: BookState;
}

const BookList: React.FC<BookProps> = ({ menuIndex, book }) => {
  // const [bookItem, setBookItem] = useState(null);
  const selectBook: SelectBookState = useAppSelector(
    (state) => state.selectBook
  );
  const dispatch = useAppDispatch();
  const listData: any[] | null = [];
  const navigate = useNavigate();

  const example: BookItem = {
    itemId: 354427810,
    title: "나의 행복한 결혼. 1",
    description:
      "일본 대인기의 판타지 로맨스 소설!!\n드디어 한국에 상륙!!\n\n명가에서 태어난 미요는 친어머니를 일찍 여의고, 새어머니와 이복동생에게 학대를 받으며 자랐다. 결혼하라는 명령을 받고 보니 상대는 냉혹하고 무자비하다는 소문이 자자한 젊은 군인 키요카. 수많은 약혼자 후보들이 사흘도 버티지 못하고 도망친다는 악평의 주인이었다.\n칼에 베일 것을 각오하며 쿠도 가의 문을 두드린 미요의 앞에 나타난 것은 색소가 옅은 미형의 남자.\n첫 만남에 매몰찬 대우를 받은 미요였으나, 본가에 돌아가지도 못하고 매일 요리를 만드는 사이에 조금씩 키요카와 마음이 통하게 된다.\n\n이것은 소녀가 사랑받고 행복해질 때까지의 이야기.",
    pubDate: "20221231",
    priceStandard: 10000,
    priceSales: 9000,
    discountRate: "10",
    saleStatus: "예약판매",
    mileage: "500",
    mileageRate: "6",
    coverSmallUrl:
      "https://bimage.interpark.com/partner/goods_image/7/8/1/0/354427810h.jpg",
    coverLargeUrl:
      "https://bimage.interpark.com/partner/goods_image/7/8/1/0/354427810s.jpg",
    categoryId: "108",
    categoryName: "국내도서",
    publisher: "소미미디어",
    customerReviewRank: 0,
    author: "아기토기 아쿠미",
    translator: "현노을",
    isbn: "9791138406277",
    link: "http://book.interpark.com/blog/integration/product/itemDetail.rdo?prdNo=354427810&refererType=8304",
    mobileLink:
      "http://m.book.interpark.com/view.html?PRD_NO=354427810&SHOP_NO=0000500000&SUB_CATE=2004",
    additionalLink:
      "http://book.interpark.com/gate/ippgw.jsp?goods_no=354427810&biz_cd=",
    reviewCount: 0,
  };

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
      // href: "book/1",
      // href: `book/${9791196661984}`,
      href: `book/${example.isbn}`,
      // title: `ant design part ${i}`,
      title: example.title,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: example.description,
      // description: example.description,
      // description:
      //   "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      // content:
      //   "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
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
                src={example.coverLargeUrl}
                // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
            onClick={() => {
              const selectBookPayload: SelectBookPayload = {
                title: example.title,
                author: example.author,
                description: example.description,
                price: example.priceStandard,
                smallImageUrl: example.coverSmallUrl,
                largeImageUrl: example.coverLargeUrl,
                categoryName: example.categoryName,
              };
              dispatch(setSelectBook(selectBookPayload));
              navigate(`/book/${example.isbn}`);
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

export default BookList;
