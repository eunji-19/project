import fetch from "node-fetch";
import { ClientToken, TokenFromClientToken } from "../models/brainToken";

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

export default { generateClientToken, generateToken };
