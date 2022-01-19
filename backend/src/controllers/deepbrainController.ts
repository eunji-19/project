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
  const { appId, platform, isClientToken, token, uuid, sdk_v, clientHostname } =
    req.body;

  try {
    console.log("----getModelList Start-----");
  } catch (err) {
    next(err);
  }
};

export default { generateClientToken, generateToken, getModelList };
