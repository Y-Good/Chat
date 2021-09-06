import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('group')
export class GroupEntity{
    @PrimaryGeneratedColumn()
    groupID:number;

    @Column({comment:'创建者ID'})
    adminID:number;

    @Column({comment:'群名称'})
    name:string;

    @Column({comment:'群简介',default:'群主很懒'})
    intro:string;

    @Column({comment:'群图标',default:'group.png'})
    icon:string;

    @CreateDateColumn({type:'timestamp',comment:'创建时间'})
    createTime:Date;

    memberIDs:Array<number>;
}