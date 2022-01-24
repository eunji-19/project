import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import rootReducer from "./modules/reducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;

// import { applyMiddleware, configureStore, createStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
// import createSagaMiddleware from "redux-saga";
// import reducer from "./modules/reducer";

// // https://react-redux.js.org/using-react-redux/usage-with-typescript

// // const sagaMiddleWare = createSagaMiddleware();

// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // export const store = createStore(
// //   reducer,
// //   composeWithDevTools(applyMiddleware(sagaMiddleWare))
// // );

// // sagaMiddleWare.run(rootSaga);
