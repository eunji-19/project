import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "../../configure";

export const bestSeller = createAsyncThunk("book/bestseller", async () => {
  const response = await axios.get(`${APP_URL}/book/best`);
  return response.data;
});

export const recommendSeller = createAsyncThunk("book/recommend", async () => {
  const response = await axios.get(`${APP_URL}/book/recommend`);
  return response.data;
});

export const newSeller = createAsyncThunk("book/new", async () => {
  const response = await axios.get(`${APP_URL}/book/new`);
  return response.data;
});
