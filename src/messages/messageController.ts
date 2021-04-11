import {
  ClientGreetingPayload,
  ClientStatusPayload,
  message,
  MESSAGES,
  newMessage,
  NewUserJoinedPayload,
  ServerGreetingPayload,
  ServerStatusPayload,
  stringify,
} from './messages';
import { myID, setID } from '../localStorage';
import { setup as setupWebsocket, socket } from '../socket';
import { User } from '../DTOs';
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { store as ToastAdder } from 'react-notifications-component';
import store from '../state';

function mapReviver(key: string, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map<string, User>(value.value);
    }
  }
  return value;
}

const interpretMessage = (message: string) => JSON.parse(message, mapReviver);

export const messageMiddleware: Middleware<Dispatch> = ({
  dispatch,
}: MiddlewareAPI) => (next) => (action: AnyAction | message) => {
  switch (action.type) {
    case MESSAGES.CLIENT_STATUS:
      onClientStatus(action.payload as ClientStatusPayload);
      break;
    case MESSAGES.SERVER_STATUS:
      onServerStatus(action.payload as ServerStatusPayload);
      break;
    case MESSAGES.CLIENT_GREETING:
      onClientGreeting(action.payload as ClientGreetingPayload);
      break;
    case MESSAGES.SERVER_GREETING:
      onServerGreeting(action.payload as ServerGreetingPayload);
      break;
    case MESSAGES.NEW_USER_JOINED:
      onNewUserJoined(action.payload as NewUserJoinedPayload);
      break;
    case MESSAGES.WS_SETUP:
      onWebsocketSetup(dispatch);
      break;
  }
  return next(action);
};

export const onWebsocketSetup = (dispatch: Dispatch): void => {
  setupWebsocket((ev: MessageEvent) => dispatch(interpretMessage(ev.data)));
};

export const onClientGreeting = (payload: ClientGreetingPayload): void => {
  socket?.send(stringify(newMessage(MESSAGES.CLIENT_GREETING, payload)));
};

export const onClientStatus = (payload: ClientStatusPayload): void => {
  ToastAdder.addNotification({
    title: 'Client status sent up!',
    message: 'Cool right?',
    type: 'success',
    insert: 'top',
    container: 'bottom-center',
    animationIn: ['animate__animated', 'animate__zoomIn'],
    animationOut: ['animate__animated', 'animate__zoomOut'],
    dismiss: {
      pauseOnHover: true,
      duration: 1000,
    },
  });
  socket?.send(stringify(newMessage(MESSAGES.CLIENT_STATUS, payload)));
};

export const onNewUserJoined = (payload: NewUserJoinedPayload): void => {
  ToastAdder.addNotification({
    title: `New user ${payload.id} joined!`,
    message: 'Amazing',
    type: 'success',
    insert: 'bottom',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__slideInDown'],
    animationOut: ['animate__animated', 'animate__slideOutUp'],
    dismiss: {
      duration: 0,
    },
  });
};

export const onServerStatus = (payload: ServerStatusPayload): void => {
  ToastAdder.addNotification({
    title: 'Server status came down!',
    message: 'Cool right?',
    type: 'success',
    insert: 'bottom',
    container: 'top-center',
    animationIn: ['animate__animated', 'animate__zoomIn'],
    animationOut: ['animate__animated', 'animate__zoomOut'],
    dismiss: {
      pauseOnHover: true,
      duration: 1000,
    },
  });

  store.dispatch(newMessage(MESSAGES.CLIENT_STATUS, { id: myID() }));
};

export const onServerGreeting = (payload: ServerGreetingPayload): void => {
  if (payload.id) {
    setID(payload.id);
  }
  store.dispatch(newMessage(MESSAGES.CLIENT_GREETING, { id: myID() }));
};
