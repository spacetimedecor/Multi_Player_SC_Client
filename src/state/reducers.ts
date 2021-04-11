import {
  message,
  MESSAGES,
  NewUserJoinedPayload,
  ServerGreetingPayload,
  ServerStatusPayload,
} from '../messages/messages';
import {
  onNewUserJoined,
  onServerGreeting,
  onServerStatus,
  onUnknownMessage,
} from '../messages/messageController';
import { ApplicationState, defaultState } from './index';
import { AnyAction, Reducer } from 'redux';

export const AppReducer: Reducer<ApplicationState> = (
  state = defaultState,
  message: AnyAction
): ApplicationState => {
  switch (message.type) {
    case MESSAGES.NEW_USER_JOINED:
      onNewUserJoined(message.payload as NewUserJoinedPayload);
      return {
        ...state,
      };
    case MESSAGES.SERVER_STATUS:
      onServerStatus(message.payload as ServerStatusPayload);
      return {
        ...state,
      };
    case MESSAGES.SERVER_GREETING:
      onServerGreeting(message.payload as ServerGreetingPayload);
      return {
        ...state,
      };
    default:
      onUnknownMessage();
      return {
        ...state,
      };
  }
};
