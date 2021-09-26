import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { Brackets, Repository } from 'typeorm';
import { FriendService } from '../friend/friend.service';
import { messageDto } from '../message/message.dto';
@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
        private readonly friendService: FriendService
    ) { }

    async getMessageData(uid: number): Promise<any[]> {
        let msgList: any[] = [];

        //统计用户对话的消息人数
        let msgListCount = await this.messageRepository
            .createQueryBuilder('message')
            .andWhere('message.fromUserID=:uid', { uid: uid })
            .groupBy('message.toUserID')
            .getMany();

        for (var i = 0; i < msgListCount.length; i++) {
            let friendInfo = await this.friendService.getMessageList(uid, msgListCount[i].toUserID);
            let msgDetail = await this.getMessage(uid, msgListCount[i].toUserID);

            msgList.push({
                friendID: friendInfo[0].friendID,
                name: friendInfo[0].name,
                avatar: friendInfo[0].friendInfo.avatar,
                postMessage: msgDetail[0].postMessage,
                sendTime: msgDetail[0].sendTime,
                type: msgDetail[0].type
            })
        }
        return msgList;


    }

    //保存消息
    async saveMessage(messageDto: messageDto): Promise<MessageEntity> {
        return await this.messageRepository.save(messageDto);
    }

    //根据日期排序返回消息内容
    async getMessage(uid: number, friendID: number): Promise<MessageEntity[]> {
        let msgContent = await this.messageRepository
            .createQueryBuilder('message')
            .where(new Brackets(qb => {
                qb.where('message.toUserID=:uid ', { uid: uid })
                    .andWhere('message.fromUserID=:friendID', { friendID: friendID })
            }))
            .orWhere(new Brackets(qb => {
                qb.where('message.toUserID=:friendID ', { friendID: friendID })
                    .andWhere('message.fromUserID=:uid', { uid: uid })
            }))
            .orderBy({ 'message.sendTime': 'DESC' },)
            .getMany();

        return msgContent


    }

    //图片列表
    async getImageList(imgDto: any) {
        let { fromUserID, toUserID } = imgDto;
        let res = await this.messageRepository.find({
            where: [
                { fromUserID: fromUserID, toUserID: toUserID, type: 'image' },
                { fromUserID: toUserID, toUserID: fromUserID, type: 'image' }],
            order: {
                sendTime: 'ASC'
            }
        });
        return res;
    }
}
