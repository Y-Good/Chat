import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from 'src/entities/friend.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(FriendEntity)
        private readonly friendRepository: Repository<FriendEntity>
    ) { }

    async saveFriend(friendDto: FriendEntity) {
        return await this.friendRepository.save(friendDto);
    }

    getFriendList(userID: number) {

       return this.friendRepository
            .createQueryBuilder('friend')
            .leftJoinAndMapOne('friend.friendInfo', UserEntity, 'user', 'friend.friendID=user.uid')
            .where('friend.userID=:userID', { userID: userID })
            .getMany();

    }

    getMessageList(userID: number,friendID:number) {

        return this.friendRepository
             .createQueryBuilder('friend')
             .leftJoinAndMapOne('friend.friendInfo', UserEntity, 'user', 'friend.friendID=user.uid')
             .where('friend.userID=:userID', { userID: userID })
             .andWhere('friend.friendID=:friendID', { friendID: friendID })
             .getMany();
 
     }
}
