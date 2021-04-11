import {
  message,
  MESSAGES,
  newMessage,
  NewUserJoinedPayload,
  ServerGreetingPayload,
  ServerStatusPayload,
} from './messages';
import { myID, setID } from '../localStorage';
import { socket, setup as setupWebsocket } from '../socket';
import { User } from '../DTOs';
import { ToastAdder } from '../App';
import { Dispatch, Middleware } from 'redux';

function mapReviver(key: string, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map<string, User>(value.value);
    }
  }
  return value;
}

const interpretMessage = (message: string) => JSON.parse(message, mapReviver);

export const messageMiddleware: Middleware = () => {
  return (dispatch: Dispatch) => (next) => (message: message) => {
    switch (message.type) {
      case MESSAGES.SERVER_STATUS:
        onServerStatus(message.payload as ServerStatusPayload);
        break;
      case MESSAGES.SERVER_GREETING:
        onServerGreeting(message.payload as ServerGreetingPayload);
        break;
      case MESSAGES.NEW_USER_JOINED:
        onNewUserJoined(message.payload as NewUserJoinedPayload);
        break;
      case MESSAGES.WS_SETUP:
        onWebsocketSetup(dispatch);
        break;
      default:
        return next(message);
    }
  };
};

export const onWebsocketSetup = (dispatch: Dispatch): void => {
  setupWebsocket((ev: MessageEvent) => dispatch(interpretMessage(ev.data)));
};

export const onNewUserJoined = (payload: NewUserJoinedPayload): void => {
  ToastAdder(`New user ${payload.id} joined!`, {
    appearance: 'success',
    autoDismiss: false,
  });
  console.log(MESSAGES.NEW_USER_JOINED);
};

export const onServerStatus = (payload: ServerStatusPayload): void => {
  ToastAdder(`Status update!`, {
    appearance: 'success',
    autoDismiss: true,
  });
  console.log(MESSAGES.SERVER_STATUS, payload);
  socket?.send(newMessage(MESSAGES.CLIENT_STATUS, { id: myID() }));
};

export const onServerGreeting = (payload: ServerGreetingPayload): void => {
  if (payload.id) {
    setID(payload.id);
  }
  console.log(MESSAGES.SERVER_GREETING, payload.id);
  socket?.send(newMessage(MESSAGES.CLIENT_GREETING, { id: myID() }));
};

export const onUnknownMessage = (): void => {
  console.log('Received unknown message');
};
