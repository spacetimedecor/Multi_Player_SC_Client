import {
  message,
  MESSAGES,
  newMessage,
  NewUserJoinedPayload,
  ServerGreetingPayload,
  ServerStatusPayload,
} from './messages';
import { myID, setID } from './localStorage';
import socket from './socket';

interface User {
  id: string;
  socket: WebSocket;
}

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
  console.log(MESSAGES.NEW_USER_JOINED);
};

export const onServerStatus = (payload: ServerStatusPayload): void => {
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
