import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendEntity } from 'src/entities/friend.entity';
import { UserEntity } from 'src/entities/user.entity';
import { MessageModule } from '../message/message.module';
import { UserModule } from '../user/user.module';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  imports:[TypeOrmModule.forFeature([FriendEntity,UserEntity]),UserModule],
  controllers: [FriendController],
  providers: [FriendService],
  exports:[FriendService]
})
export class FriendModule {}
