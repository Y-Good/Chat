import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from 'src/entities/group.entity';
import { GroupMemberEntity } from 'src/entities/group_member.entity';
import { UserModule } from '../user/user.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
    imports: [TypeOrmModule.forFeature([GroupEntity,GroupMemberEntity]),UserModule],
    controllers: [GroupController],
    providers: [GroupService],
    exports: [GroupService]
})
export class GroupModule { }
