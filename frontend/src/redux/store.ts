import { configureStore } from "@reduxjs/toolkit";
import reducer from "./modules/reducer";

// https://react-redux.js.org/using-react-redux/usage-with-typescript

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
