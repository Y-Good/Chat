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

    //添加好友
    async addFriend(friendDto: FriendEntity) {
        // return await this.friendRepository.save(friendDto);
        let { friendID, userID } = friendDto;
        return await this.friendRepository
            .createQueryBuilder('friend')
            .insert()
            .into(FriendEntity)
            .values([{ userID: userID, friendID: friendID, cross: 2 }, { userID: friendID, friendID: userID }])
            .execute();
    }

    getFriendList(userID: number) {

        return this.friendRepository
            .createQueryBuilder('friend')
            .leftJoinAndMapOne('friend.friendInfo', UserEntity, 'user', 'friend.friendID=user.uid')
            .where('friend.userID=:userID', { userID: userID })
            .andWhere('friend.cross=1')
            .getMany();
    }

    getMessageList(userID: number, friendID: number) {

        return this.friendRepository
            .createQueryBuilder('friend')
            .leftJoinAndMapOne('friend.friendInfo', UserEntity, 'user', 'friend.friendID=user.uid')
            .where('friend.userID=:userID', { userID: userID })
            .andWhere('friend.friendID=:friendID', { friendID: friendID })
            .getMany();
    }

    //同意申请
    async agreeFriend(friendDto: FriendEntity) {
        let { friendID, userID } = friendDto;
        let res = await this.friendRepository.find({ where: [{ friendID: friendID, userID: userID }, { friendID: userID, userID: friendID }] });
        res[0].cross = 1;
        res[1].cross = 1;
        return await this.friendRepository.save([res[0], res[1]]);

    }

    //申请列表
    async getApplyList(userID: number) {
        return this.friendRepository
            .createQueryBuilder('friend')
            .leftJoinAndMapOne('friend.friendInfo', UserEntity, 'user', 'friend.friendID=user.uid')
            .where('friend.userID=:userID', { userID: userID })
            .andWhere('friend.cross=0')
            .getMany();
    }

    //删除
    async deleteFriend(friendDto: FriendEntity) {
        let { friendID, userID } = friendDto;
        let res = await this.friendRepository.find({ where: { friendID: friendID, userID: userID } });

        return await this.friendRepository.remove(res[0]);
    }

    //验证好友
    async verifyFriend(friendID: number, userID: number) {
        let res = await this.friendRepository.find({ where: { friendID: friendID, userID: userID, cross: 1 } });
        return res.length > 0 ? true : false;
    }
}
