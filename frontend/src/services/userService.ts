import axios from "axios";
import { APP_URL } from "../configure";
import { LoginReqType } from "../types";

export default class UserService {
  public static async login(reqData: LoginReqType) {
    const response = await axios.post(`${APP_URL}/auth/login`, reqData);
    return response.data;
  }

  public static async logout(): Promise<void> {
    await axios.get(`${APP_URL}/auth/logout`);
  }
}
