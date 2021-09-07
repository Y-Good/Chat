import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from 'src/entities/group.entity';
import { GroupMemberEntity } from 'src/entities/group_member.entity';
import { Like, Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(GroupEntity)
        private readonly groupRepository: Repository<GroupEntity>,
        @InjectRepository(GroupMemberEntity)
        private readonly groupMemberRepository: Repository<GroupMemberEntity>,
        private readonly userService: UserService
    ) { }

    //建群
    async buildGroup(groupDto: GroupEntity) {
        return await this.groupRepository.save(groupDto);
    }

    //群成员id数组
    async addGroupMember(groupID: number, memberIDs: number[]) {
        let members: any[] = [];

        for (let i = 0; i < memberIDs.length; i++) {
            let { nickname } = await this.userService.findByAny({ 'uid': memberIDs[i] });
            members.push({ groupID: groupID, userID: memberIDs[i], name: nickname });
        }

        return this.groupMemberRepository
            .createQueryBuilder('group_member')
            .insert()
            .into(GroupMemberEntity)
            .values(members)
            .execute()
    }

    //获取群列表
    async getGroupList(uid: number) {
        return this.groupMemberRepository.createQueryBuilder('group_member')
            .leftJoinAndMapOne('group_member.groupInfo', GroupEntity, 'group', 'group_member.groupID=group.groupID')
            .where('group_member.userID=:userID', { userID: uid })
            .getMany();
    }

    //获取群成员
    async getGroupMemberList(groupID: number) {
        return await this.groupMemberRepository
            .createQueryBuilder('group_member')
            .select()
            .where('group_member.groupID=:groupID', { groupID: groupID })
            .getMany()
    }

    ///修改本群昵称
    async updateGroupNickname(groupID: number, userID: number, name: string) {
        return await this.groupMemberRepository
            .createQueryBuilder('group_member')
            .update(GroupMemberEntity)
            .set({ name: name })
            .where('groupID = :groupID', { groupID: groupID })
            .andWhere('userID=:userID', { userID: userID })
            .execute();

    }

    //修改群信息
    async updateGroupInfo(groupDto: GroupEntity) {
        let { name, icon, intro, groupID } = groupDto;
        let res = await this.groupRepository.findOne({ groupID: groupID });
        res.name = name;
        res.intro = intro;
        res.icon = icon;
        return this.groupRepository.save(res);
    }

    async findByAny(any: any) {
        return await this.groupRepository.findOne(any);
    }

     //模糊搜索
     async groupSearch(key:string){
        return await this.groupRepository.find({name:Like(`%${key}%`)});
    }
}
