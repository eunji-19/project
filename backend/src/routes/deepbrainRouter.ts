import express, { Request, Response, NextFunction } from "express";
import { deepbrainController } from "../controllers";

const router = express.Router();

/**
 * ModelList
 */
router.post(
  "/modelList",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deepbrainController.getModelList(req, res, next);
      return result;
    } catch (err) {
      res.status(400).json({ statusMessage: err.message });
    }
  }
);

/**
 * make video key
 */
router.post("/makeVideoKey", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await deepbrainController.makeVideoKey(req, res, next);
    return result;
  } catch (err) {
      res.status(400).json({ statusMessage: err.message });
  }
})

/**
 * make video
 */
router.post("/makeVideo", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await deepbrainController.makeVideo(req, res, next);
    return result;
  } catch (err) {
      res.status(400).json({ statusMessage: err.message });
  }
})

export = router;
