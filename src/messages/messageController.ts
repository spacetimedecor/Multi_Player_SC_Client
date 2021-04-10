import {
  message,
  MESSAGES,
  newMessage,
  NewUserJoinedPayload,
  ServerGreetingPayload,
  ServerStatusPayload,
} from './messages';
import { myID, setID } from '../localStorage';
import socket from '../socket';
import { User } from '../DTOs';
import { ToastAdder } from '../App';

function mapReviver(key: string, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map<string, User>(value.value);
    }
  }
  return value;
}

export const onMessage = (aMessage: string): void => {
  const interpretMessage: message = JSON.parse(aMessage, mapReviver);
  switch (interpretMessage.type) {
    case MESSAGES.NEW_USER_JOINED:
      onNewUserJoined(interpretMessage.payload as NewUserJoinedPayload);
      break;
    case MESSAGES.SERVER_STATUS:
      onServerStatus(interpretMessage.payload as ServerStatusPayload);
      break;
    case MESSAGES.SERVER_GREETING:
      onServerGreeting(interpretMessage.payload as ServerGreetingPayload);
      break;
    default:
      onUnknownMessage();
      break;
  }
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
  socket.send(newMessage(MESSAGES.CLIENT_STATUS, { id: myID() }));
};

export const onServerGreeting = (payload: ServerGreetingPayload): void => {
  if (payload.id) {
    setID(payload.id);
  }
  console.log(MESSAGES.SERVER_GREETING, payload.id);
  socket.send(newMessage(MESSAGES.CLIENT_GREETING, { id: myID() }));
};

export const onUnknownMessage = (): void => {
  console.log('Received unknown message');
};
