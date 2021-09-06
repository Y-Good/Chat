import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';




@WebSocketGateway(3003, { transports: ['websocket'] })
export class WsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string,@ConnectedSocket() client: Socket) {

    client.send(data);

    // return client;
  }


}
