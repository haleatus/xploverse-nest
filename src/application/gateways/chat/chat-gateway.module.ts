import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(5002, {})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  /**
   * handling client connection and disconnect events
   */
  handleConnection(client: Socket) {
    console.log('new user connected ~ ', client.id);
  }

  handleDisconnect(client: any) {
    console.log('user disconnected..', client.id);
  }

  // listens to the incoming messages of the event named "newMessage" from the client---implementation of socket.on
  @SubscribeMessage('newMessage')
  handleMessage(client: Socket, message: any) {
    console.log(message);

    /**
     * emits or sends back the message to only the specific client associated with the event named "reply"
     * only if we get an incomming message from that client
     */
    client.emit('reply', 'Hello Back');

    // emits or sends back the message to every client associated with the event named "reply"
    this.server.emit('reply', 'broadcasting......');
  }
}
