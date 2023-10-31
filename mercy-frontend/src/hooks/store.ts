import { ConfigureStoreOptions, TypedUseSelectorHook, configureStore, useDispatch, useSelector } from "./redux";
import { fetchApi } from "../api/fetchApi";
import userSlice from "./slicer/userPayloadSlice";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      user: userSlice,
      [fetchApi.reducerPath]: fetchApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(fetchApi.middleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
