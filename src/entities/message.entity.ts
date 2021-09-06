import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('message')
export class MessageEntity {
    // @PrimaryColumn()
    // msgId: number;

    @PrimaryColumn({ type: 'bigint', default: new Date().getTime() })
    dateTime: number;
    
    @Column({ comment: '消息内容' })
    postMessage: string;

    @Column()
    status: number;

    @Column()
    fromUserID: number;

    @Column()
    toUserID: number;

}