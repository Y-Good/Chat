import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FriendEntity } from 'src/entities/friend.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { FriendService } from '../friend/friend.service';
import { MessageDto } from './message.dto';
import { MessageService } from './message.service';

@ApiTags('消息')
@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService,
        private readonly friendService: FriendService
    ) { }

  
    @Get(':uid')
    @ApiOperation({summary:"获取用户消息列表"})
    async getMessageData(@Param() param: any) {
        let applyData:FriendEntity[] = await this.friendService.getApplyList(param.uid);
        let res: any[] = await this.messageService.getMessageData(param.uid);

        if (applyData.length > 0) {
            // res.push({
            //     fromUserID: applyData[0].friendID,
            //     avatar: 'apply.png',
            //     postMessage: applyData[0].note,
            //     sendTime: applyData[0].createTime,
            //     type: 'apply'
            // });
            res.unshift({
                fromUserID: applyData[0].friendID,
                avatar: 'apply.png',
                postMessage: applyData[0].note,
                sendTime: applyData[0].createTime,
                type: 'apply'
            });
        }

        // res.unshift(res);
       
    
        return res;
    }

    // @Post()
    // async saveMessage(@Body() messageDto: MessageEntity) {
    //     return this.messageService.saveMessage(messageDto);
    // }

    //指定好友消息对话
    @Post('friend')
    @ApiOperation({summary:"获取好友聊天记录"})
    async getFriendMessage(@Body() body: MessageEntity) {
        let { fromUserID, toUserID } = body;
        let res = await this.messageService.getMessage(fromUserID, toUserID);
        return res.reverse();
    }

    // 消息图片列表
    @Post('image')
    async getImageList(@Body() imgDto: any) {
        return await this.messageService.getImageList(imgDto);
    }

    //标记已读  
    @Post('isread')
    @ApiOperation({summary:"标记已读消息"})
    async isReadMsg(@Body() messageDto:MessageDto){
        await this.messageService.isReadMsg(messageDto);
    }
}
