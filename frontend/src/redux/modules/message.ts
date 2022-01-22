import { AnyAction } from "@reduxjs/toolkit";
import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

export interface MessageState {
  axiosMessage: string;
}

const initialState: MessageState = { axiosMessage: "" };

export default function reducerMessage(state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { axiosMessage: payload };

    case CLEAR_MESSAGE:
      return { axiosMessage: "" };

    default:
      return state;
  }
}
