import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('group_msg')
export class GroupMsgEntity{
    @PrimaryGeneratedColumn()
    groupMsgID:number;

    @Column()
    groupID:number;

    @Column()
    fromID:number;

    @Column({comment:'消息内容'})
    content:string;

    @UpdateDateColumn({comment:'发送时间',type:'timestamp'})
    sendTime:Date;

    @Column({comment:'发送者昵称'})
    fromName:string;
}