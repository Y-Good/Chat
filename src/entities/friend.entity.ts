import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('friend')
export class FriendEntity {

    @PrimaryGeneratedColumn()
    fid: number;

    @CreateDateColumn({ comment: '创建时间' })
    createTime: Date;

    @UpdateDateColumn({ comment: '更新时间' })
    updateTime: Date;

    // @ManyToOne((type) => UserEntity)
    // @JoinColumn({name:'friendID'})
    // friendID: UserEntity;


    // @ManyToOne((type) => UserEntity)
    // @JoinColumn({name:'userID'})
    // userID: UserEntity;

    @Column()
    friendID: number;

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