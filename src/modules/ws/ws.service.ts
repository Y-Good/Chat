import { Injectable } from '@nestjs/common';
import { FriendEntity } from 'src/entities/friend.entity';
import { MessageInterface } from 'src/interfaces/message.interface';
import { FriendService } from '../friend/friend.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class WsService {
    constructor(private readonly messageService: MessageService, private readonly friendService: FriendService) { }

    async getFriendNickname(data: MessageInterface): Promise<FriendEntity[]> {
        let { toUserID, fromUserID } = data;
        return await this.friendService.getMessageList(toUserID, fromUserID);
    }

    //保存消息
    async saveMsg(data: MessageInterface) {
        this.messageService.saveMessage(data);
        this.friendService.recoverList(data);
    }
}
