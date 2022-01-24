import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "../../configure";

/**
 * getModelList
 */
export const brainModel = createAsyncThunk(
  "brain/model",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${APP_URL}/deepbrain/modelList`, {
        token: token,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  }
);
