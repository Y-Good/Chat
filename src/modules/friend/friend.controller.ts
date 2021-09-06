import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FriendEntity } from 'src/entities/friend.entity';
import { UserService } from '../user/user.service';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
    constructor(private readonly fridendService: FriendService, private readonly userService: UserService) { }

    @Post()
    async addFriend(@Body() friendDto: FriendEntity) {
        return await this.fridendService.saveFriend(friendDto);
    }

    @Get()
    async getFriendList(@Query() userIdDto: FriendEntity) {
        return await this.fridendService.getFriendList(userIdDto);
    }
}
