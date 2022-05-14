import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "app/rootReducer";
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
 key: "state",
 storage,
 blacklist: ["app"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
 reducer: persistedReducer,
 middleware: (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
   serializableCheck: false,
  }),
});
export const persistor = persistStore(store);
type Props = {
 children: React.ReactNode;
};
export const StoreProvider = ({ children }: Props) => {
 return (
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
    {children}
   </PersistGate>
  </Provider>
 );
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = () =>
 useSelector((state: RootState) => state);
