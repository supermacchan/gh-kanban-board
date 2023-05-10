import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { issuesReducer } from "./slices/repoSlice";
import { userReducer } from "./slices/userSlice";
import localStorage from 'redux-persist/lib/storage';
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
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root/repo',
    storage: localStorage,
    blacklist: ['issues'],
    stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
    user: userReducer,
    issues: issuesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => 
      getDefaultMiddleware({
          serializableCheck: {
              ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
      })
});

export const persistor = persistStore(store);