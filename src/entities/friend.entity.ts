import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Common } from "./common.entity";
import { UserEntity } from "./user.entity";

@Entity('friend')
export class FriendEntity extends Common{

    @PrimaryGeneratedColumn()
    fid: number;

    @Column()
    friendID: number;
    
    @ApiProperty()
    @Column()
    userID: number;

    @Column({ comment: '备注昵称', default: '哇哇哇' })
    name: string;

    @Column({ type: 'bigint', default: new Date().getTime(), comment: '最后通话时间' })
    lasttime: number;

    @Column({ default: 0 })
    cross: number;

    friendInfo:UserEntity
}