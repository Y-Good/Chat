import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { of } from 'rxjs';
import { Socket,Server } from 'socket.io';


@WebSocketGateway(3003,{transports:['websocket']})
export class WsGateway {
  @WebSocketServer() wss:Server
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any,@MessageBody() data) {
    console.log(data);
    // this.wss.emit('message',data)
    return of({event:'test',data:'haha'});
  }
}
