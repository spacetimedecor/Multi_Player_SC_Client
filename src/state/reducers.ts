import { message, MESSAGES } from '../messages/messages';
import { ApplicationState, defaultState } from './index';
import { Reducer } from 'redux';

export const AppReducer: Reducer<ApplicationState, message> = (
  state = defaultState,
  message: message
): ApplicationState => {
  switch (message.type) {
    case MESSAGES.NEW_USER_JOINED:
      return {
        ...state,
      };
    case MESSAGES.SERVER_STATUS:
      return {
        ...state,
        AppReducer: state.AppReducer + 1,
      };
    case MESSAGES.SERVER_GREETING:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
