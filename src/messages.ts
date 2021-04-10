export type messagePayloadTypes =
  | ServerGreetingPayload
  | ClientGreetingPayload
  | ServerStatusPayload
  | ClientStatusPayload
  | NewUserJoinedPayload;

export type message = {
  type: MESSAGES;
  payload: messagePayloadTypes;
};

export enum MESSAGES {
  SERVER_STATUS = 'Just checking in with SERVER status :)',
  CLIENT_STATUS = 'Just checking in with CLIENT status :)',
  SERVER_GREETING = 'Hello from server!',
  CLIENT_GREETING = 'Hello from client!',
  NEW_USER_JOINED = 'A new user joined, :D OMFG!',
}

export type NewUserJoinedPayload = {
  id: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ServerStatusPayload = {};

export type ClientStatusPayload = { id: string };

export type ServerGreetingPayload = {
  id: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ClientGreetingPayload = { id: string | null };

export function newMessage(
  type: MESSAGES,
  payload: messagePayloadTypes
): string {
  let typedPayload;
  switch (type) {
    case MESSAGES.CLIENT_STATUS:
      typedPayload = payload as ClientStatusPayload;
      return JSON.stringify({
        type: MESSAGES.CLIENT_STATUS,
        payload: { id: typedPayload.id } as ClientStatusPayload,
      } as message);
    case MESSAGES.CLIENT_GREETING:
      typedPayload = payload as ClientGreetingPayload;
      return JSON.stringify({
        type: MESSAGES.CLIENT_GREETING,
        payload: { id: typedPayload.id } as ClientGreetingPayload,
      } as message);
    default:
      return '';
  }
}
