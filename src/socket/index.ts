import { myID } from '../localStorage';

export let socket: WebSocket | null = null;

export function setup(onMessage: (ev: MessageEvent) => void): void {
  socket = new WebSocket(`ws://localhost:8081?id=${myID()}`);
  socket.onmessage = onMessage;
}
