import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FriendEntity } from 'src/entities/friend.entity';
import { UserService } from '../user/user.service';
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
        return await this.fridendService.getApplyList(param.uid);
    }

    //添加好友
    @Post('add')
    async addFriend(@Body() friendDto: FriendEntity) {
        return await this.fridendService.addFriend(friendDto);
    }

    //同意申请
    @Post('agree')
    async agreeFriend(@Body() friendDto: FriendEntity) {
        return await this.fridendService.agreeFriend(friendDto);
    }

    //删除好友
     @Post('delete')
     async deleteFriend(@Body() friendDto: FriendEntity) {
         return await this.fridendService.deleteFriend(friendDto);
     }
}
