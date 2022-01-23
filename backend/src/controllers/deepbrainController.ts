import { Request, Response, NextFunction } from "express";
import { ClientToken, TokenFromClientToken } from "../models/brainToken";
import { deepbrainService } from "../services";

/**
 * generateClientToken
 */
const generateClientToken = async (
  next: NextFunction
): Promise<ClientToken> => {
  try {
    const clientToken = await deepbrainService.generateClientToken();
    return clientToken;
  } catch (err) {
    next(err);
  }
};

/**
 * generateToken
 */
const generateToken = async (
  clientToken: string,
  next: NextFunction
): Promise<TokenFromClientToken> => {
  try {
    const token = await deepbrainService.generateToken(clientToken);
    return token;
  } catch (err) {
    next(err);
  }
};

/**
 * ModelList 받아오기
 */
const getModelList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  try {
    console.log("----get modelList start----");
    const result = await deepbrainService.getModelList(token);
    if (!result.succeed) {
      res.status(400).json({ statusMessage: result });
      return;
    }
    return res.status(200).json({ statusMessage: result });
  } catch (err) {
    next(err);
  }
};

/**
 * Make Video
 */
const makeVideoKey = async (req: Request, res: Response, next: NextFunction) => {
  const { language, text, model, clothes, token } = req.body;
  try {
    const result = await deepbrainService.makeVideoKey(language, text, model, clothes, token);
    if (result.succeed) {
      res.status(400).json({ statusMessage: result });
      return;
    }
    return res.status(200).json({ statusMessage: result });
  } catch (err) {
    next(err);
  }
}

/**
 * Make Real Video
 */
const makeVideo = async (req: Request, res: Response, next: NextFunction) => {
  const { key, token } = req.body;
  try {
    const result = await deepbrainService.makeVideo(key, token);
    console.log("Result ", result);
    // if (result.success) {
    //   res.status(400).json({ statusMessage: result });
    //   return;
    // }
    return res.status(200).json({ statusMessage: result });
  } catch (err) {
    next(err);
  }
}

export default { generateClientToken, generateToken, getModelList, makeVideoKey, makeVideo };
