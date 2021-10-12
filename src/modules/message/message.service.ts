import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { FriendEntity } from 'src/entities/friend.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { Brackets, Repository } from 'typeorm';
import { FriendService } from '../friend/friend.service';
import { MessageDto } from '../message/message.dto';
@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
        private readonly friendService: FriendService
    ) { }
    //消息列表
    async getMessageData(uid: number): Promise<any[]> {
        let msgList: any[] = [];
        let fid: number;

        //统计用户对话的消息人数
        let msgListCount: MessageEntity[] = await this.messageRepository
            .createQueryBuilder('message')
            .where('message.fromUserID=:uid', { uid: uid })
            // .orWhere('message.toUserID=:uid', { uid: uid })
            // .andWhere('message.fromUserID=message.toUserID')
            .groupBy('message.toUserID')
            // .addGroupBy('message.fromUserID')
            .getMany();


        for (var i = 0; i < msgListCount.length; i++) {
            //当前用户id与结果比较，保证传入朋友id
            fid = msgListCount[i].toUserID == uid ? msgListCount[i].fromUserID : msgListCount[i].toUserID;

            let friendInfo: FriendEntity[] = await this.friendService.getMessageList(uid, fid);
            let msgDetail: MessageEntity[] = await this.getMessage(msgListCount[i].fromUserID, msgListCount[i].toUserID);
            let notReadMsgCount: number = await this.notRedMsgCount(msgListCount[i].fromUserID, msgListCount[i].toUserID);
            if (friendInfo[0].isDelete == 0) {
                if (msgDetail != null && friendInfo != null)
                    //整合数据
                    msgList.push({
                        notReadMsgCount: notReadMsgCount,
                        fromUserID: friendInfo[0]?.friendID,
                        name: friendInfo[0]?.name,
                        avatar: friendInfo[0]?.friendInfo.avatar,
                        postMessage: msgDetail[0]?.postMessage,
                        sendTime: msgDetail[0]?.sendTime,
                        type: msgDetail[0]?.type
                    })
            }
        }
        //日期排序
        return msgList.sort((a, b) => { return b.sendTime < a.sendTime ? -1 : 1 });
    }

    //保存消息
    async saveMessage(messageDto: MessageDto): Promise<MessageEntity> {
        return await this.messageRepository.save(messageDto);
    }

    //根据日期排序返回消息内容
    async getMessage(uid: number, friendID: number): Promise<MessageEntity[]> {
        let msgContent = await this.messageRepository
            .createQueryBuilder('message')
            .where(new Brackets(qb => {
                qb.where('message.toUserID=:uid1 ', { uid1: uid })
                    .andWhere('message.fromUserID=:friendID1', { friendID1: friendID })
            }))
            .orWhere(new Brackets(qb => {
                qb.where('message.toUserID=:friendID2 ', { friendID2: friendID })
                    .andWhere('message.fromUserID=:uid2', { uid2: uid })
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

    //标记已读
    async isReadMsg(messageDto: MessageDto) {
        let { fromUserID, toUserID } = messageDto;
        await this.messageRepository
            .createQueryBuilder()
            .update("message")
            .set({ status: "1" })
            // .where({ fromUserID: fromUserID, toUserID: toUserID })
            .where({ fromUserID: toUserID, toUserID: fromUserID })
            .execute();
    }

    //统计读消息条数
    async notRedMsgCount(fromUserID: number, toUserID: number): Promise<number> {
        let notReadCount = await this.messageRepository.find({ where: { fromUserID: toUserID, toUserID: fromUserID, status: 0 } });
        return notReadCount.length;
    }


    //消息图片
    async saveMsgPic(file: any) {
        const writeImage = createWriteStream(join(__dirname, '..', '../../public/message', `${file.originalname}`))
        writeImage.write(file.buffer)
    }

}
