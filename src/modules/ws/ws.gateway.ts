import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageEntity } from 'src/entities/message.entity';
import { messageDto } from '../message/message.dto';
import { MessageService } from '../message/message.service';


@WebSocketGateway(3003, { transports: ['websocket'] })
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) { }
  private logger: Logger = new Logger('ChatGateway');

  roomId: string;

  afterInit(server: any) {
    this.logger.log('websocket init ...');
  }
  handleConnection(socket: Socket) {
    console.log(socket.handshake.query);

    let { fromUserID, toUserID } = socket.handshake.query;
    this.roomId = fromUserID > toUserID ? fromUserID.toString() + toUserID.toString() : toUserID.toString() + fromUserID.toString();
    socket.join(this.roomId);
    console.log("uid:" + fromUserID + "进入");

  }
  handleDisconnect(socket: Socket) {
    console.log("离开");
  }

  @WebSocketServer() wss: Server;

  @SubscribeMessage('wori')
  handleMessage(@ConnectedSocket() socket: Socket, @MessageBody() data: messageDto) {
    // let { fromUserID, toUserID } = data;
    // let roomId = fromUserID > toUserID ? fromUserID.toString() + toUserID.toString() : toUserID.toString() + fromUserID.toString();
    // console.log(data);


    // this.messageService.saveMessage(data);
    this.wss.to(this.roomId).emit('haha', data);
  }
}
