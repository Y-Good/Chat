import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupEntity } from 'src/entities/group.entity';
import { FriendService } from 'src/modules/friend/friend.service';
import { GroupService } from 'src/modules/group/group.service';
import { SearchService } from './search.service';

@ApiTags('搜索')
@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService,
        private readonly friendService: FriendService,
        private readonly groupService:GroupService
    ) { }

    //搜索
    
    @Post()
    async search(@Body() body: any) {
        let { uid, key } = body;
        let userList: any[] = [];
        let groupList: any[] = [];

        let user: any = await this.searchService.getUserSearch(key);
        let group:any = await this.searchService.getGroupSearch(key);

        for (let i = 0; i < user.length; i++) {
            let verifys:boolean = await this.friendService.verifyFriend(user[i].uid, uid);
            user[i].verify = verifys;
            userList.push(user[i]);
        }

        for (let i = 0; i < group.length; i++) {
            let verifys:boolean = await this.groupService.verifyGroup(group[i].groupID, uid);
            group[i].verify = verifys;
            groupList.push(group[i]);
        }
        return { user: userList, group: groupList ,v:true};

    }
}
