import { AnyAction } from 'redux';

export type messagePayloadTypes =
  | ServerGreetingPayload
  | ClientGreetingPayload
  | ServerStatusPayload
  | ClientStatusPayload
  | NewUserJoinedPayload
  | WebsockerSetupPayload;

export interface message extends AnyAction {
  type: MESSAGES;
  payload?: messagePayloadTypes;
}

export enum MESSAGES {
  SERVER_STATUS = 'Just checking in with SERVER status :)',
  CLIENT_STATUS = 'Just checking in with CLIENT status :)',
  SERVER_GREETING = 'Hello from server!',
  CLIENT_GREETING = 'Hello from client!',
  NEW_USER_JOINED = 'A new user joined, :D OMFG!',
  WS_SETUP = 'Setting up CLIENT websocket connection',
  WS_CONNECT = 'Websocket is connected',
  WS_DISCONNECT = 'Websocket is disconnected',
  UNKNOWN = 'Unknown message',
}

export type NewUserJoinedPayload = {
  id: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ServerStatusPayload = {
  toClientID: string;
  currentUsers: string[];
};

export type ClientStatusPayload = { id: string };

// eslint-disable-next-line @typescript-eslint/ban-types
export type WebsockerSetupPayload = {};

export type ServerGreetingPayload = {
  id: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ClientGreetingPayload = { id: string | null };

export function newMessage(
  type: MESSAGES,
  payload: messagePayloadTypes
): message {
  switch (type) {
    case MESSAGES.WS_SETUP:
      return {
        type: MESSAGES.WS_SETUP,
        payload: payload as WebsockerSetupPayload,
      } as AnyAction;
    case MESSAGES.CLIENT_STATUS:
      return {
        type: MESSAGES.CLIENT_STATUS,
        payload: payload as ClientStatusPayload,
      } as AnyAction;
    case MESSAGES.CLIENT_GREETING:
      return {
        type: MESSAGES.CLIENT_GREETING,
        payload: payload as ClientGreetingPayload,
      } as AnyAction;
    default:
      return {
        type: MESSAGES.UNKNOWN,
        payload: payload,
      };
  }
}

export function stringify(message: message): string {
  return JSON.stringify(message);
}
