//store.ts

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { loginAPI } from "@/services/login";
import userSlice from "./userSlice";
// import userSlice from "./Slices/user.slice";
// import { loginAPI } from "./Services/UserLoginAPI";
// import toastSlice from "./Slices/toast.slice";

const persistConfig = { key: "root", storage };

const appReducer = combineReducers({
  user: userSlice,
  // toast: toastSlice,
  [loginAPI.reducerPath]: loginAPI.reducer,
 
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      loginAPI.middleware,
     
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
// Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']