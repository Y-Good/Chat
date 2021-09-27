import { Module } from '@nestjs/common';
import { FriendModule } from '../friend/friend.module';
import { MessageModule } from '../message/message.module';


@Module({imports:[MessageModule,FriendModule]})
export class WsModule {}
