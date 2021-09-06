import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('group_member')
export class GroupMemberEntity{
    @PrimaryGeneratedColumn()
    gmID:number;

    @Column()
    groupID:number;

    @Column()
    userID:number;

    @Column({default:'',comment:'群内昵称'})
    name:string;

    @CreateDateColumn({type:'timestamp',comment:'加入时间'})
    createTime:Date;

    @Column({default:0,comment:'未读消息'})
    unreadCount:number;

    @Column({type:'timestamp',comment:'最后通话时间'})
    lasttime: Date;

    @UpdateDateColumn({type:'timestamp'})
    updateTime:Date;

    @Column({comment:'屏蔽(0,1,2)',default:0})
    shield:number;

    groupInfo:any;
}