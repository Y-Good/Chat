import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageEntity } from 'src/entities/message.entity';
import { MessageService } from './message.service';

@ApiTags('消息')
@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ) { }

    @Get()
    async getMessageData(@Query() param: any) {
        let res = await this.messageService.getMessageData(param.uid);
        return res;

    }

    @Post()
    async saveMessage(@Body() messageDto: MessageEntity) {
        return this.messageService.saveMessage(messageDto);
    }


}
