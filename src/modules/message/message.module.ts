import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { FriendModule } from '../friend/friend.module';
import { MessageService } from './message.service';

@Module({
  imports:[TypeOrmModule.forFeature([MessageEntity]),FriendModule],
  providers: [MessageService],
  exports:[MessageService]
})
export class MessageModule {}
