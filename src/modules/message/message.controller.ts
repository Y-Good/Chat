import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FriendEntity } from 'src/entities/friend.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { FriendService } from '../friend/friend.service';
import { MessageService } from './message.service';

@ApiTags('消息')
@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService,
        private readonly friendService: FriendService
    ) { }

    @Get(':uid')
    async getMessageData(@Param() param: any) {
        let res: any[] = [];
        let applyData = await this.friendService.getApplyList(param.uid);
        let msgData = await this.messageService.getMessageData(param.uid);

        if (applyData.length > 0) {
            res.push({
                friendID: applyData[0].friendID,
                avatar: 'apply.png',
                postMessage: applyData[0].name,
                sendTime: applyData[0].createTime,
                type: 'apply'
            });
        }

        msgData.forEach((item) => {
            res.push(item);
        });
        return res;
    }

    @Post()
    async saveMessage(@Body() messageDto: MessageEntity) {
        return this.messageService.saveMessage(messageDto);
    }

    //指定好友消息对话
    @Post('friend')
    async getFriendMessage(@Body() body: MessageEntity) {
        let { fromUserID, toUserID } = body;
        let res = await this.messageService.getMessage(fromUserID, toUserID);
        return res.reverse();
    }


}
