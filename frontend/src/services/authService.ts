import axios, { AxiosError, AxiosResponse } from "axios";
import { APP_URL } from "../configure";
import { AuthSignup } from "../models/Auth";
import { LoginReqType, SignupReqType } from "../types";

export default class AuthService {
  public static async login(reqData: LoginReqType) {
    const response = await axios.post(`${APP_URL}/auth/login`, reqData);
    return response.data;
  }

  public static async logout(): Promise<void> {
    await axios.get(`${APP_URL}/auth/logout`);
  }

  public static async signUp(reqData: SignupReqType) {
    const result = await axios
      .post(`${APP_URL}/auth/signup`, reqData)
      .catch((err: AxiosError) => {
        // recover the reject state before.
        return Promise.reject(err.response);
      });

    return result; // not exec when reject
  }

  // public static async signUp(reqData: SignupReqType) {
  //   return await axios
  //     .post(`${APP_URL}/auth/signup`, reqData)
  //     .then((response) => ({ response }))
  //     .catch((reason: AxiosError) => ({ reason.response?.data }));
  //   // return await axios
  //   //   .post(`${APP_URL}/auth/signup`, reqData)
  //   //   .then((response) => ({ response }))
  //   //   .catch((err) => ({ err }));
  //   // try {
  //   //   const response = await axios.post(`${APP_URL}/auth/signup`, reqData);
  //   //   return response;
  //   // } catch (error: any) {
  //   //   const err = error as AxiosError;
  //   //   console.log("err ", err.response?.data);
  //   //   return { err };
  //   // }
  //   // return response;
  // }
}
