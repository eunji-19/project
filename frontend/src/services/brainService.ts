import axios from "axios";
import { APP_URL } from "../configure";

export default class BrainService {
  public static getModelList(token: string) {
    return axios
      .post(`${APP_URL}/deepbrain/modelList`, { token: token })
      .then((response) => {
        return response.data;
      });
  }
}
