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

export const onMessage = (aMessage: string): void => {
  const interpretMessage: message = JSON.parse(aMessage);
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
  console.log(MESSAGES.SERVER_STATUS);
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
