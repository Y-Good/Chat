import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FriendEntity } from 'src/entities/friend.entity';
import { MessageDto } from '../message/message.dto';
import { UserService } from '../user/user.service';
import { friendDto } from './friend.dto';
import { FriendService } from './friend.service';

@ApiTags('好友')
@Controller('friend')
export class FriendController {
    constructor(private readonly fridendService: FriendService, private readonly userService: UserService) { }

    //获取用户好友
    @Get(':userID')
    async getFriendList(@Param() userIdDto: FriendEntity) {
        return await this.fridendService.getFriendList(userIdDto.userID);

    }

    //申请列表
    @Get('apply/:uid')
    async getApplyList(@Param() param: any) {
        let res: any[] = [];
        let applyList = await this.fridendService.getApplyList(param.uid);

        applyList.forEach((item) => {
            res.push({
                friendID: item.friendID,
                nickname: item.friendInfo.nickname,
                avatar: item.friendInfo.avatar,
                time: item.createTime,
                name: item.name,
                note: item.note
            })
        })

        return res;
    }

    //添加好友
    @Post('add')
    async addFriend(@Body() friendDto: friendDto) {
        return await this.fridendService.addFriend(friendDto);
    }

    //同意申请
    @Post('agree')
    async agreeFriend(@Body() friendDto: friendDto) {
        let res = await this.fridendService.agreeFriend(friendDto);
        if (res.length > 0) {
            return { status: 200, msg: '你们已成为好友了！' }
        }
    }

    //删除好友
    @Post('delete')
    async deleteFriend(@Body() friendDto: friendDto) {
        this.fridendService.deleteFriend(friendDto);
        return { status: 200, msg: '已删除好友' }
    }

    //查询用户是否为好友
    @Post('verify')
    async isMyFriend(@Body() verifyDto: any) {
        let {friendID, userID}=verifyDto;
        return  await this.fridendService.verifyFriend(friendID, userID);
       
    }

    //移除消息列表
    @Post('removelist')
    async removeList(@Body() messageDto:MessageDto){
        this.fridendService.removeList(messageDto);
    }
}
