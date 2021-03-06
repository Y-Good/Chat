import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { FriendEntity } from 'src/entities/friend.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { MessageInterface } from 'src/interfaces/message.interface';
import { FriendService } from '../friend/friend.service';
import { MessageService } from '../message/message.service';
import { WsService } from './ws.service';


@WebSocketGateway(3003, { transports: ['websocket'] })
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly wsService:WsService){}

  private logger: Logger = new Logger('ChatGateway');
  socketList: any = {};

  afterInit(server: any) {
    this.logger.log('websocket init ...');
  }
  handleConnection(socket: Socket) {
    let fromUserID: string = socket.handshake.query.uid.toString();
    this.socketList[fromUserID] = socket.id;
    console.log("id:" + socket.id + "进入");
  }

  handleDisconnect(socket: Socket) {
    let uid: string = socket.handshake.query.uid.toString();
    if (this.socketList.hasOwnProperty(uid)) {
      //删除
      delete this.socketList[uid];
    }
  }

  @WebSocketServer() wss: Server;
  @SubscribeMessage('msg')
  async handleMessage(@ConnectedSocket() socket: Socket, @MessageBody() data: MessageInterface) {
    console.log(data);

    //获取好友昵称
    let res:FriendEntity[] = await this.wsService.getFriendNickname(data);
    
    if (res!=null) {
      data.name = res[0].name;
      data.avatar = res[0].friendInfo.avatar;
    }
    
    //保存消息
    this.wsService.saveMsg(data);
    this.wss.to(this.socketList[data.toUserID.toString()]).emit('haha', data);
  }
}
