import axios from "axios";
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

  public static async signUp(reqData: SignupReqType): Promise<AuthSignup> {
    const response = await axios.post(`${APP_URL}/auth/signup`, reqData);
    return response.data as AuthSignup;
  }
}
