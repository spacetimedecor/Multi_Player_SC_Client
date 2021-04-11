import logger from 'redux-logger';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SCRedux from 'supercollider-redux';
import { configureStore } from '@reduxjs/toolkit';
import { messageMiddleware } from '../messages/messageController';
import { AppReducer } from './reducers';

export const defaultState = {
  AppReducer: 1,
};

const store = configureStore({
  reducer: {
    App: AppReducer,
    [SCRedux.DEFAULT_MOUNT_POINT]: SCRedux.reducer,
  },
  middleware: [messageMiddleware, logger] as const,
  devTools: true,
});

export interface ApplicationState {
  AppReducer: number;
}
export default store;

// const scReduxController = new SCRedux.SCReduxController(store);
//
// // scReduxController
// //   .boot()
// //   .then(() => {})
// //   .catch((err) => {});
