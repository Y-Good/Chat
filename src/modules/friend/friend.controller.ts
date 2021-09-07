import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FriendEntity } from 'src/entities/friend.entity';
import { UserService } from '../user/user.service';
import { FriendService } from './friend.service';

@ApiTags('好友')
@Controller('friend')
export class FriendController {
    constructor(private readonly fridendService: FriendService, private readonly userService: UserService) { }
    
    @Get(':userID')
    async getFriendList(@Param() userIdDto: FriendEntity) { 
        return await this.fridendService.getFriendList(userIdDto.userID);
        
    }
    
    @Post()
    async addFriend(@Body() friendDto: FriendEntity) {
        return await this.fridendService.saveFriend(friendDto);
    }

}
