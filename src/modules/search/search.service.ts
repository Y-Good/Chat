import { Injectable } from '@nestjs/common';
import { GroupService } from 'src/modules/group/group.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class SearchService {
    constructor(
        private readonly userService: UserService,
        private readonly groupService: GroupService
    ) { }

    //用户
    async getUserSearch(key: string) {
        return await this.userService.userSearch(key);
    }

    //群
    async getGroupSearch(key: string) {
        return await this.groupService.groupSearch(key);
    }
}
