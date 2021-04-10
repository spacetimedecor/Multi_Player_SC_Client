import { onMessage } from './messageController';
import { MESSAGES, newMessage } from './messages';
import { myID } from './localStorage';

const socket = new WebSocket(`ws://localhost:8081?id=${myID()}`);

export default socket;

// socket.onopen = () => {};

socket.onmessage = (ev: MessageEvent) => {
  onMessage(ev.data);
};
