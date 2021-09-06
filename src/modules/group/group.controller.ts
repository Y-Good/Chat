import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupEntity } from 'src/entities/group.entity';
import { GroupMemberEntity } from 'src/entities/group_member.entity';
import { GroupService } from './group.service';

@ApiTags('群相关')
@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    //获取群
    @Get(':uid')
    async getGroupList(@Param() param: any) {
        return this.groupService.getGroupList(param.uid);
    }

    //群成员
    @Get('member/:groupID')
    async getGroupMemberList(@Param() param: any) {
        return this.groupService.getGroupMemberList(param.groupID);
    }

    @Post()
    async buildGroup(@Body() groupDto: GroupEntity) {
        let { groupID } = await this.groupService.buildGroup(groupDto);

        let memberIDs: number[] = [1, 2, 3];//groupDto中获得数组
        return this.groupService.addGroupMember(groupID, memberIDs)
    }

    //修改本群昵称
    @Post('nickname')
    async updateGroupNickname(@Body() userDto: GroupMemberEntity) {
        let { groupID, userID,name } = userDto;
        return await this.groupService.updateGroupNickname(groupID, userID,name);
    }

    //修改群信息
    @Post('info')
    async updateGroupInfo(@Body() groupDto:GroupEntity){
        return await this.groupService.updateGroupInfo(groupDto);
    }
}
