import express, { Request, Response, NextFunction } from "express";
import { bookController } from "../controllers";

const router = express.Router();

/**
 * 베스트셀러
 */
router.get("/best", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookController.getBestSeller(req, res, next);
    return result;
  } catch (err) {
    res.status(400).json({ statusMessage: err.message });
  }
});

/**
 * 추천도서
 */
router.get(
  "/recommend",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await bookController.getRecommendSeller(req, res, next);
      return result;
    } catch (err) {
      res.status(400).json({ statusMessage: err.message });
    }
  }
);

/**
 * 신규도서
 */
router.get("/new", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookController.getNewSeller(req, res, next);
    return result;
  } catch (err) {
    res.status(400).json({ statusMessage: err.message });
  }
});

/**
 * 좋아하는 책 담기 
 */
router.post("/like", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookController.getLikeBook(req, res, next);
    return result;
  } catch (err) {
    res.status(400).json({ statusMessage: err.message });
  }
});

router.post("/findLike", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookController.getFindLikeBook(req, res, next);
    return result;
  } catch (err) {
    res.status(400).json({ statusMessage: err.message });
  }
})

router.post("/initLike", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookController.getInitLikeBook(req, res, next);
    return result;
  } catch (err) {
    res.status(400).json({ statusMessage: err.message });
  }
})

router.post("/myBook", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookController.getMyBook(req, res, next);
    return result; 
  } catch (err) {
    res.status(400).json({ statusMessage: err.message });
  }
})

export = router;
