import { Request, Response, NextFunction } from "express";
import { bookService } from "../services";

/**
 * 인터파크 베스트셀러 API
 * categoryId : 100 국내도서
 * categoryId : 200 외국도서
 */
const getBestSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bestSellerResult = await bookService.getBookResult(
      "bestSeller",
      "bestSeller.api"
    );
    res.status(200).json({ statusMessage: bestSellerResult });
  } catch (err) {
    next(err);
  }
};

/**
 * 인터파크 추천도서 API
 */
const getRecommendSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recommendBookResult = await bookService.getBookResult(
      "recommendBook",
      "recommend.api"
    );
    res.status(200).json({ statusMessage: recommendBookResult });
  } catch (err) {
    next(err);
  }
};

/**
 * 인터파크 신규도서 API
 */
const getNewSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBookResult = await bookService.getBookResult(
      "newBook",
      "newBook.api"
    );
    res.status(200).json({ statusMessage: newBookResult });
  } catch (err) {
    next(err);
  }
};

/**
 * 좋아하는 책 / 취소
 */
const getLikeBook = async (req: Request, res: Response, next: NextFunction) => {
  const {
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
  } = req.body;
  try {
    console.log("----like book start----");
    /**
     * 좋아요 책인지부터 확인
     */
    const existingLikeBook = await bookService.findLikeBook(email, title);
    if (existingLikeBook) {
      const deleteLikeBook = await bookService.deleteLikeBook(existingLikeBook);
      console.log("After delete ", deleteLikeBook);
      res.status(200).json({ statusMessage: "더이상 좋아하는 책이 아닙니다." });
      return;
    }

    /**
     * 없으면 좋아요 기능 시작
     */
    const newLikeBook = await bookService.setLikeBook(
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
      email
    );
    return res.status(200).json({ statusMessage: newLikeBook });
  } catch (err) {
    next(err);
  }
};

const getInitLikeBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
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
  } = req.body;
  try {
    console.log("----like book start----");
    /**
     * 좋아요 책인지부터 확인
     */
    const existingLikeBook = await bookService.findLikeBook(email, title);
    console.log("exi ", existingLikeBook);
    if (existingLikeBook) {
      res.status(200).json({
        statusMessage: {
          title: existingLikeBook.title,
        },
      });
      return;
    }
    return res
      .status(200)
      .json({ statusMessage: "아직 좋아하는 책이 아닙니다." });
  } catch (err) {
    next(err);
  }
};

/**
 * 마이페이지에서 좋아하는책 리스트 나열
 */
export const getMyBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const myBookResult = await bookService.findMyBook(email);
    return res.status(200).json({ statusMessage: myBookResult });
  } catch (err) {
    next(err);
  }
};

export default {
  getBestSeller,
  getRecommendSeller,
  getNewSeller,
  getLikeBook,
  getInitLikeBook,
  getMyBook,
};
