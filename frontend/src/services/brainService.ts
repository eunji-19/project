import axios from "axios";
import { APP_URL } from "../configure";
import { FindProjectReqType, VideoKeyReqType } from "../types";

export default class BrainService {
  public static getModelList(token: string) {
    return axios
      .post(`${APP_URL}/deepbrain/modelList`, { token: token })
      .then((response) => {
        return response.data;
      });
  }

  public static getMakeVideoKey(reqData: VideoKeyReqType) {
    return axios
      .post(`${APP_URL}/deepbrain/makeVideo`, reqData)
      .then((reponse) => {
        return reponse.data;
      });
  }

  public static async getFindProject(reqData: FindProjectReqType) {
    const result = await axios
      .post(`${APP_URL}/deepbrain/findProject`, reqData)
      .catch((error) => {
        return error;
      });
    return result.data;
  }
}
