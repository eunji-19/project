import { AnyAction } from "@reduxjs/toolkit";
import { Model } from "../../models/brain/Model";
import { FindProjectType, MakeVideo } from "../../models/brain/Video";
import { FINDPROJECT_FAIL, FINDPROJECT_SUCCEESS, MAKEVIDEO_FAIL, MAKEVIDEO_SUCCESS, MODELLIST_FAIL, MODELLIST_SUCCESS } from "../actions/types";

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
  videoKey: MakeVideo | null;
  videoIsLoadig: boolean;
  error: any | null;
}

const videoInitialState: VideoKeyState = {
  videoKey: null,
  videoIsLoadig: true,
  error: null,
}

export function videoKey(
  state: VideoKeyState = videoInitialState,
  action: AnyAction
) {
  const { type, payload } = action;
  console.log("payload ", payload);

  switch (type) {
    case MAKEVIDEO_SUCCESS:
      return {
        ...state,
        videoKey: payload,
        videoIsoading: false,
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

/**
 * FIND Project
 */
export interface FindProjectState {
  findProject: FindProjectType | null;
  projectIsLoading: boolean;
  projectError: any | null;
};

const findProjectInitialState: FindProjectState = {
  findProject: null,
  projectIsLoading: true,
  projectError: null
};

export function findProject(
  state: FindProjectState = findProjectInitialState,
  action: AnyAction
) {
  const { type, payload } = action;

  switch (type) {
    case FINDPROJECT_SUCCEESS:
      return {
        ...state,
        findProject: payload,
        projectIsLoading: false,
        error: null,
      };
    case FINDPROJECT_FAIL:
      return {
        ...state,
        findProject: null,
        projectIsLoading: false,
        error: null,
      };
    default:
      return state;
  }
}