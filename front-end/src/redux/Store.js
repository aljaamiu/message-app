import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "main-root",
  version: 1,
  storage: storage,
};

const reducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// })
