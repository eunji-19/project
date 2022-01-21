import { useNavigate } from "react-router-dom";
import { BookItem } from "../models/Book";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { BookState } from "../redux/modules/book";
import {
  SelectBookPayload,
  SelectBookState,
  setSelectBook,
} from "../redux/modules/selectBook";
import { List, Avatar } from "antd";
import Icon from "@ant-design/icons";

interface BookProps {
  book: BookState;
}

interface BookDetail {
  href: string;
  title: string;
  avatar: string;
  content: string;
  coverLargeUrl: string;
  author: string;
  publisher: string;
  customerReviewRank: number;
  priceStandard: number;
  coverSmallUrl: string;
  categoryName: string;
  isbn: string;
}

const BookListNew: React.FC<BookProps> = ({ book }) => {
  /**
   * 국내도서 기준 domesticItemList
   * 해외도서 기준 foreignItemList
   */
  const domesticItemList = book.books!.statusMessage.domestic.item;
  const foreignItemList = book.books!.statusMessage.foreign.item;

  /**
   * 선택한 책
   */
  const selectBook: SelectBookState = useAppSelector(
    (state) => state.selectBook
  );
  const dispatch = useAppDispatch();

  const listData: BookDetail[] = [];
  const navigate = useNavigate();

  for (let i = 0; i < domesticItemList.length; i++) {
    listData.push({
      href: `book/${domesticItemList[i].isbn}`,
      title: domesticItemList[i].title,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: domesticItemList[i].description,
      coverLargeUrl: domesticItemList[i].coverLargeUrl,
      author: domesticItemList[i].author,
      publisher: domesticItemList[i].publisher,
      customerReviewRank: domesticItemList[i].customerReviewRank,
      priceStandard: domesticItemList[i].priceStandard,
      coverSmallUrl: domesticItemList[i].coverSmallUrl,
      categoryName: domesticItemList[i].categoryName,
      isbn: domesticItemList[i].isbn,
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
                width={210}
                height={200}
                alt="logo"
                src={item.coverLargeUrl}
                // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
            onClick={() => {
              console.log("Click item");
              const selectBookPayload: SelectBookPayload = {
                title: item.title,
                author: item.author,
                description: item.content,
                price: item.priceStandard,
                smallImageUrl: item.coverSmallUrl,
                largeImageUrl: item.coverLargeUrl,
                categoryName: item.categoryName,
              };
              dispatch(setSelectBook(selectBookPayload));
              navigate(`/book/${item.isbn}`);
            }}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.title}
              description={`작가: ${item.author} 출판사: ${item.publisher} 별점: ${item.customerReviewRank}`}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default BookListNew;
