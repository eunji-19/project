import fetch from "node-fetch";
import { LikeBookModel, LikeBook } from "../models/likeBook";

/**
 * 검색을 위한 공통 Query
 */
const apiParam = (categoryId: number) => {
  return {
    key: process.env.INTERPARK_API_KEY,
    categoryId: categoryId,
    output: "json",
  };
};

const query = (parmas: Object) => {
  return Object.keys(parmas)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(parmas[k]))
    .join("&");
};

/**
 * 인터파크 API 호출
 * category: 베스트셀러, 신간도서, 추천도서
 * subUrl: 위에 해당하는 url ex)bestSeller.api
 */
const getBookResult = async (category: string, subUrl: string) => {
  const categoryUrl = new URL(`${process.env.INTERPARK_API_URL}/${subUrl}?`);

  /**
   * 국내도서 기준 결과 출력
   */
  const domesticParam = apiParam(100);
  const domesticQuery = query(domesticParam);

  const domesticInfo = await fetch(categoryUrl.toString() + domesticQuery);
  let domesticResult = await domesticInfo.json();

  if (domesticResult.returnCode !== "000") {
    domesticResult = {
      returnCode: domesticResult.returnCode,
      returnMessage: domesticResult.returnMessage,
    };
  }

  /**
   * 외국도서 기준 결과 출력
   */
  const foreignParam = apiParam(200);
  const foreignQuery = query(foreignParam);

  const foreignInfo = await fetch(categoryUrl.toString() + foreignQuery);
  let foreignResult = await foreignInfo.json();

  if (foreignResult.returnCode !== "000") {
    foreignResult = {
      returnCode: foreignResult.returnCode,
      returnMessage: foreignResult.returnMessage,
    };
  }

  const resultMap = {
    category: category,
    domestic: domesticResult,
    foreign: foreignResult,
  };

  return resultMap;
};

/**
 * 좋아하는 책인지 확인
 */
const findLikeBook = async (email: string, title: string) => {
  console.log("!!!!");
  const findBook = await LikeBookModel.findOne({ title: title, email: email });
  return findBook;
};

/**
 * 좋아하는 책에서 삭제!
 */
const deleteLikeBook = async (existingLikeBook: any) => {
  const deleteBook = await LikeBookModel.findByIdAndDelete(existingLikeBook);
  console.log("deleteBook ", deleteBook);
  return deleteBook;
};

/**
 * 좋아하는 책 생성
 */
const setLikeBook = async (
  href: string,
  title: string,
  avatar: string,
  content: string,
  coverLargeUrl: string,
  author: string,
  publisher: string,
  customerReviewRank: number,
  priceStandard: number,
  coverSmallUrl: string,
  categoryName: string,
  isbn: string,
  email: string
) => {
  const likeBook = new LikeBookModel({
    href,
    title,
    avatar,
    content,
    coverLargeUrl,
    author,
    publisher,
    customerReviewRank,
    priceStandard,
    coverSmallUrl,
    categoryName,
    isbn,
    email,
  });
  return await likeBook.save();
};

const findMyBook = async (email: string) => {
  console.log("email ", email);
  const myBook = await LikeBookModel.find({ email: email });
  console.log("?", myBook);
  return myBook;
};

export default {
  getBookResult,
  findLikeBook,
  deleteLikeBook,
  setLikeBook,
  findMyBook,
};
