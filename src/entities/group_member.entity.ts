import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Common } from "./common.entity";

@Entity('group_member')
export class GroupMemberEntity extends Common{
    @PrimaryGeneratedColumn()
    gmID:number;

    @Column()
    groupID:number;

    @Column()
    userID:number;

    @Column({default:'',comment:'群内昵称'})
    name:string;

    @Column({default:0,comment:'未读消息'})
    unreadCount:number;

    @Column({type:'timestamp',comment:'最后通话时间'})
    lasttime: Date;

    @Column({comment:'屏蔽(0,1,2)',default:0})
    shield:number;

    groupInfo:any;
}