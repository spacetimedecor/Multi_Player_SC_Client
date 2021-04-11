import {
  message,
  MESSAGES,
  ServerStatusPayload,
  WebsockerSetupPayload,
} from '../messages/messages';
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
      const typedMessage = message.payload as ServerStatusPayload;
      return {
        ...state,
        currentUsers: typedMessage.currentUsers,
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
