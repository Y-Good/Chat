import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>
    ) { }

    async getMessageData(uid: number) {
        return await this.messageRepository
            .createQueryBuilder('message')
            .where('fromUserID=:uid', { uid: uid })
            .getMany()
    }

    async saveMessage(messageDto:MessageEntity){
        return await this.messageRepository.save(messageDto);
    }

}
