import { AnyAction } from "@reduxjs/toolkit";
import { Model } from "../../models/brain/Model";
import {
  FindProject,
  FindProjectStatusMessage,
} from "../../models/brain/Video";
import {
  FINDPROJECT_FAIL,
  FINDPROJECT_SUCCEESS,
  MAKEVIDEO_FAIL,
  MAKEVIDEO_SUCCESS,
  MODELLIST_FAIL,
  MODELLIST_SUCCESS,
} from "../actions/types";

/**
 * MODEL
 */
export interface ModelState {
  model: Model | null;
  isLoading: boolean;
}

const modelInitialState: ModelState = {
  model: null,
  isLoading: true,
};

export function model(
  state: ModelState = modelInitialState,
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

/**
 * Video key
 */
export interface VideoKeyState {
  videoKey: string | null;
  videoIsLoadig: boolean;
  error: any | null;
}

const videoInitialState: VideoKeyState = {
  videoKey: null,
  videoIsLoadig: true,
  error: null,
};

export function videoKey(
  state: VideoKeyState = videoInitialState,
  action: AnyAction
) {
  const { type, payload } = action;
  // console.log("payload ", payload);

  switch (type) {
    case MAKEVIDEO_SUCCESS:
      return {
        ...state,
        videoKey: payload,
        videoIsLoading: false,
        error: null,
      };
    case MAKEVIDEO_FAIL:
      return {
        ...state,
        vdieoKey: null,
        videoIsLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
