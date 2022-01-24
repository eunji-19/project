/**
 * Deep Brain API와 연관된 부분들
 * - getModelList
 * - videoKey
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Model } from "../../models/brain/Model";
import { brainModel } from "../actions/_brainAction";

// getModelList
export interface ModelState {
  model: Model | null;
  modelLoading: boolean;
  modelError: any | null;
}

const modelInitialState: ModelState = {
  model: null,
  modelLoading: true,
  modelError: null,
};

const ModelSlice = createSlice({
  name: "brain/model",
  initialState: modelInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(brainModel.pending, (state, action) => {
        state.modelLoading = true;
      })
      .addCase(brainModel.fulfilled, (state, action) => {
        state.model = action.payload;
        state.modelLoading = false;
        state.modelError = null;
      })
      .addCase(brainModel.rejected, (state, action: PayloadAction<any>) => {
        state.model = null;
        state.modelLoading = false;
        state.modelError = null;
      });
  },
});

export { ModelSlice };
