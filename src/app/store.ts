import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import uiReducer from "../store/uiSlices";

import { apiMiddlewares,combinedAPIReducer } from "../api";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["mediaLibraryAPIs"],
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      ui:uiReducer,
      ...combinedAPIReducer,
    })
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiMiddlewares),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
