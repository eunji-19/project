import express, { Request, Response, NextFunction } from "express";
import { deepbrainController } from "../controllers";

const router = express.Router();

/**
 * ModelList
 */
router.get("/modelList", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await deepbrainController.getModelList(req, res, next);
    return result;
  } catch (err) {
    res.status(400).json({ statusMessage: err.message });
  }
});

export = router;
