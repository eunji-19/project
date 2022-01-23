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
    return axios.post(`${APP_URL}/deepbrain/makeVideo`, reqData)
      .then((reponse) => {
        return reponse.data;
    })
  }

  public static getFindProject(reqData: FindProjectReqType) {
    return axios.post(`${APP_URL}/deepbrain/findProject`, reqData)
      .then((response) => {
        return response.data;
      });
  }
}
