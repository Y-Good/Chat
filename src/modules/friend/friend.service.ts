import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from 'src/entities/friend.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Brackets, Not, Repository } from 'typeorm';
import { MessageDto } from '../message/message.dto';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';
import { FriendDto } from './friend.dto';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(FriendEntity)
        private readonly friendRepository: Repository<FriendEntity>
    ) { }

    //添加好友
    async addFriend(friendDto: FriendDto) {
        // return await this.friendRepository.save(friendDto);
        let { friendID, userID, name } = friendDto;
        //查询是否存在
        let res = await this.friendRepository.find({ where: [{ userID: userID, friendID: friendID }, { userID: friendID, friendID: userID }] });
        //两人互加
        let wori = await this.friendRepository.find({ where: { userID: userID, friendID: friendID, cross: 0 } });
        if (wori.length > 0) return { msg: "先同意人家", status: 206 }
        if (res.length > 0) return { msg: "不要重复添加", status: 206 }
        return await this.friendRepository
            .createQueryBuilder('friend')
            .insert()
            .into(FriendEntity)
            .values([{ userID: userID, friendID: friendID, cross: 2, name: name }, { userID: friendID, friendID: userID }])
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

    getMessageList(userID: number, friendID: number): Promise<FriendEntity[]> {
        return this.friendRepository
            .createQueryBuilder('friend')
            .leftJoinAndMapOne('friend.friendInfo', UserEntity, 'user', 'friend.friendID=user.uid')
            .where('friend.userID=:userID', { userID: userID })
            .andWhere('friend.friendID=:friendID', { friendID: friendID })
            .getMany();
    }

    //同意申请
    async agreeFriend(friendDto: FriendDto) {
        let { friendID, userID } = friendDto;

        let res: FriendEntity[] = await this.friendRepository.find({ where: [{ friendID: friendID, userID: userID }, { friendID: userID, userID: friendID }] });
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
    async deleteFriend(friendDto: FriendDto) {
        let { friendID, userID } = friendDto;

        let res: FriendEntity[] = await this.friendRepository.find({ where: [{ friendID: friendID, userID: userID }, { friendID: userID, userID: friendID }] });
        res.forEach(item => {
            this.friendRepository.remove(item);
        });
    }

    //验证好友
    async verifyFriend(friendID: number, userID: string) {
        let res = await this.friendRepository.find({ where: { friendID: friendID, userID: userID, cross: 1 } });

        return { verify: res.length > 0 ? true : false, name: res[0]?.name };
    }

    //移除消息列表
    removeList(messageDto: MessageDto) {
        let { fromUserID, toUserID } = messageDto;

        this.friendRepository
            .createQueryBuilder('friend')
            .update(FriendEntity)
            .set({ isDelete: 1 })
            .where("userID=:userID", { userID: fromUserID })
            .andWhere("friendID=:friendID", { friendID: toUserID })
            .execute();
    }

    //恢复消息列表
    recoverList(messageDto: MessageDto) {
        let { fromUserID, toUserID } = messageDto;

        this.friendRepository
            .createQueryBuilder('friend')
            .update(FriendEntity)
            .set({ isDelete: 0 })
            .where(new Brackets(qb => {
                qb.where('userID=:userID1 ', { userID1: toUserID })
                    .andWhere('friendID=:friendID1', { friendID1: fromUserID })
            }))
            .orWhere(new Brackets(qb => {
                qb.where('userID=:userID2 ', { userID2: fromUserID })
                    .andWhere('friendID=:friendID2', { friendID2: toUserID })
            }))
            .execute();
    }
}
