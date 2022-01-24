import fetch from "node-fetch";
import { ModelList } from "../models/modelList";
import { ClientToken, TokenFromClientToken } from "../models/brainToken";
import { FindProjectType, MakeVideo } from "../models/makeVideo";
import axios from "axios";

/**
 * generateClientToken
 */
const generateClientToken = async (): Promise<ClientToken> => {
  const generateClientTokenURL = new URL(
    `${process.env.DEEP_BRAIN_URL}/generateClientToken`
  );
  generateClientTokenURL.searchParams.append(
    "appId",
    process.env.DEEP_BRAIN_APPID
  );
  generateClientTokenURL.searchParams.append(
    "userKey",
    process.env.DEEP_BRAIN_USERKEY
  );
  const generateClientTokenFetch = await fetch(
    generateClientTokenURL.toString(),
    { method: "GET" }
  );
  const generateClientToken = await generateClientTokenFetch.json();
  return generateClientToken;
};

/**
 * generateToken
 */
const generateToken = async (
  clientToken: string
): Promise<TokenFromClientToken> => {
  const generateTokenURL = new URL(
    `${process.env.DEEP_BRAIN_URL}/generateToken`
  );
  const body = {
    appId: process.env.DEEP_BRAIN_APPID,
    platform: "web",
    isClientToken: true,
    token: clientToken,
    uuid: process.env.DEEP_BRAIN_USERKEY,
    sdk_v: "1.0",
    clientHostname: process.env.DEEP_BRAIN_CLIENTHOSTNAME,
  };
  const generateTokenFetch = await fetch(generateTokenURL.toString(), {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const token = await generateTokenFetch.json();
  return token;
};

/**
 * getModelList
 */
const getModelList = async (token: string): Promise<ModelList | null> => {
  const getModelURL = new URL(`${process.env.DEEP_BRAIN_URL}/getModelList`);
  const body = {
    appId: process.env.DEEP_BRAIN_APPID,
    platform: "web",
    isClientToken: true,
    token: token,
    uuid: process.env.DEEP_BRAIN_USERKEY,
    sdk_v: "1.0",
    clientHostname: process.env.DEEP_BRAIN_CLIENTHOSTNAME,
  };
  const getModelFetch = await fetch(getModelURL.toString(), {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const getModel = await getModelFetch.json();
  return getModel;
};

/**
 * makeVideo
 */
const makeVideoKey = async (
  language: string,
  text: string,
  model: string,
  clothes: number,
  token: string
): Promise<MakeVideo | null> => {
  const makeVideoKeyURL = new URL(`${process.env.DEEP_BRAIN_URL}/makeVideo`);
  const body = {
    appId: process.env.DEEP_BRAIN_APPID,
    platform: "web",
    isClientToken: true,
    token: token,
    uuid: process.env.DEEP_BRAIN_USERKEY,
    sdk_v: "1.0",
    clientHostname: process.env.DEEP_BRAIN_CLIENTHOSTNAME,
    language,
    text,
    model,
    clothes,
  };
  const getMakeVideoFetch = await fetch(makeVideoKeyURL.toString(), {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const getMakeVideo = await getMakeVideoFetch.json();
  return getMakeVideo;
};

/**
 * make Video
 */
const makeVideo = async (key: string, token: string) => {
  const makeVideoURL = new URL(`${process.env.DEEP_BRAIN_URL}/findProject`);
  const body = {
    appId: process.env.DEEP_BRAIN_APPID,
    platform: "web",
    isClientToken: true,
    token: token,
    uuid: process.env.DEEP_BRAIN_USERKEY,
    sdk_v: "1.0",
    clientHostname: process.env.DEEP_BRAIN_CLIENTHOSTNAME,
    key,
  };

  console.log(JSON.stringify(body));
  const getMakeVideoFetch = await fetch(makeVideoURL.toString(), {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const getMakeVideo = await getMakeVideoFetch.json();
  return getMakeVideo;
};

export default {
  generateClientToken,
  generateToken,
  getModelList,
  makeVideoKey,
  makeVideo,
};
