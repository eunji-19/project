import { AnyAction } from "@reduxjs/toolkit";
import { Model } from "../../models/Model";
import { MODELLIST_FAIL, MODELLIST_SUCCESS } from "../actions/types";

export interface ModelState {
  model: Model | null;
  isLoading: boolean;
}

const initialState: ModelState = {
  model: null,
  isLoading: true,
};

export default function model(
  state: ModelState = initialState,
  action: AnyAction
) {
  const { type, payload } = action;

  switch (type) {
    case MODELLIST_SUCCESS:
      return {
        ...state,
        model: payload,
        isLoading: false,
      };
    case MODELLIST_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
