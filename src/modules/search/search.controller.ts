import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GroupEntity } from 'src/entities/group.entity';
import { UserEntity } from 'src/entities/user.entity';
import { FriendService } from 'src/modules/friend/friend.service';
import { GroupService } from 'src/modules/group/group.service';
import { SearchKeyDto } from './search.dto';
import { SearchService } from './search.service';

@ApiTags('搜索')
@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService,
        private readonly friendService: FriendService,
        private readonly groupService: GroupService
    ) { }

    //搜索

    @Post()
    @ApiOperation({summary:"搜索"})
    async search(@Body() searchKeyDto: SearchKeyDto) {
        
        let { uid, key } = searchKeyDto;
        let userList: UserEntity[] = [];
        let groupList: GroupEntity[] = [];

        let user: any = await this.searchService.getUserSearch(key);
        let group: any = await this.searchService.getGroupSearch(key);

        for (let i = 0; i < user.length; i++) {
            let res=await this.friendService.verifyFriend(user[i].uid, uid);
            user[i].verify=res.verify;
            user[i].name=res.name;
            userList.push(user[i]);
        }

        for (let i = 0; i < group.length; i++) {
            let verify: boolean = await this.groupService.verifyGroup(group[i].groupID, uid);
            group[i].verify = verify;
            groupList.push(group[i]);
        }

        return { users: userList, groups: groupList};
    }
}
