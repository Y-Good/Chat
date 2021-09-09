import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    msgId: number;

    @UpdateDateColumn({type:'timestamp',comment:'发送时间'})
    sendTime: Date;
    
    @Column({ comment: '消息内容' })
    postMessage: string;

    @Column({default:0})
    status: number;

    @Column()
    fromUserID: number;

    @Column()
    toUserID: number;

    @Column({default:'text'})
    type:string;

}