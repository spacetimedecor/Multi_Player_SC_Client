import logger from 'redux-logger';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SCRedux from 'supercollider-redux';
import { configureStore } from '@reduxjs/toolkit';
import { messageMiddleware } from '../messages/messageController';
import { AppReducer } from './reducers';
import { message } from '../messages/messages';

export const defaultState = {
  AppReducer: 1,
};

const store = configureStore({
  reducer: {
    App: AppReducer,
    [SCRedux.DEFAULT_MOUNT_POINT]: SCRedux.reducer,
  },
  middleware: [logger, messageMiddleware] as const,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export interface ApplicationState {
  AppReducer: number;
}
export default store;

// const rootReducer = combineReducers({
//   [SCRedux.DEFAULT_MOUNT_POINT]: SCRedux.reducer,
// });
//
// const scReduxController = new SCRedux.SCReduxController(store);
//
// scReduxController
//   .boot()
//   .then(() => {})
//   .catch((err) => {});
