import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageEntity } from 'src/entities/message.entity';
import { MessageService } from './message.service';

@ApiTags('消息')
@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ) { }

    @Get(':uid')
    async getMessageData(@Param() param: any) {
        return  await this.messageService.getMessageData(param.uid);
    }

    @Post()
    async saveMessage(@Body() messageDto: MessageEntity) {
        return this.messageService.saveMessage(messageDto);
    }

    //指定好友消息对话
    @Post('friend')
    async  getFriendMessage(@Body() body:MessageEntity){
        let {fromUserID,toUserID}=body;
       let res=await this.messageService.getMessage(fromUserID,toUserID);
       return res.reverse();
    }


}
