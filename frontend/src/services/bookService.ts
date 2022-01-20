import axios from "axios";
import { APP_URL } from "../configure";

export default class BookService {
  public static getBestSeller() {
    return axios.get(`${APP_URL}/book/best`).then((response) => response.data);
  }

  public static getRecommendSeller() {
    return axios
      .get(`${APP_URL}/book/recommend`)
      .then((response) => response.data);
  }

  public static getNewSeller() {
    return axios.get(`${APP_URL}/book/new`).then((response) => response.data);
  }
}
