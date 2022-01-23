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
  const { email, title, author, smallImageUrl } = req.body;
  try {
    console.log("----like book start----");
    /**
     * 좋아요 책인지부터 확인 
     */
    const existingLikeBook = await bookService.findLikeBook(email, title);
    if (existingLikeBook) {
      // const deleteLikeBook = await bookService.deleteLikeBook(existingLikeBook);
      // console.log("After delete ", deleteLikeBook); 
      res
        .status(400)
        .json({ statusMessage: "좋아하는 책에서 삭제하시겠습니까?" });
      return;
    }

    /**
     * 없으면 좋아요 기능 시작
     */
    const newLikeBook = await bookService.setLikeBook(email, title, author, smallImageUrl);
    res.status(200).json(newLikeBook);

  } catch (err) {
    next(err);
  }
}

export default { getBestSeller, getRecommendSeller, getNewSeller, getLikeBook };
