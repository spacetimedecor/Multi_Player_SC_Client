import { onMessage } from '../messages/messageController';
import { myID } from '../localStorage';

const socket = new WebSocket(`ws://localhost:8081?id=${myID()}`);

export default socket;

socket.onmessage = (ev: MessageEvent) => {
  onMessage(ev.data);
};
