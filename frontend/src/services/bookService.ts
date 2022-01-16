import axios from "axios";
import { APP_URL } from "../configure";

export default class BookService {
    public static async getBestSeller() {
        const response = await axios.get(`${APP_URL}/book/best`);
        return response.data;
    }

    public static async getRecommendSeller() {
        const response = await axios.get(`${APP_URL}/book/recommend`)
        return response.data;
    }

    public static async getNewSeller() {
        const response = await axios.get(`${APP_URL}/book/new`)
        return response.data;
    }
}