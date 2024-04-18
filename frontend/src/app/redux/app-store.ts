import { configureStore, ThunkAction, TypedStartListening, UnknownAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';
import { baseApi } from '@/shared/api';
import { listenerMiddleware } from './listener.ts';
import { sessionSlice } from '@/entities/session';

const persistConfig = {
  key: 'root',
  whitelist: [sessionSlice.name],
  storage,
};

export const setupStore = () => {
  const store = configureStore({
    // 👇 ATTENTION: persistReducer broke infering RootState
    reducer: persistReducer(persistConfig, rootReducer) as unknown as typeof rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .prepend(listenerMiddleware.middleware)
        .concat(baseApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

export const appStore = setupStore();
export const persistor = persistStore(appStore);

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
