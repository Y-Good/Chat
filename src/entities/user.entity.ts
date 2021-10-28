import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Common } from "./common.entity";

@Entity({ name: 'user' })
export class UserEntity extends Common {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    username: string;

    @Column()
    nickname: string;

    @Column({ select: false })
    password: string;

    @Column()
    email: string;

    @Column({ default: 3 })
    sex: number;

    @Column({ type: 'timestamp', default: null })
    birth: Date;

    @Column({ default: 'user.png' })
    avatar: string;

    @Column({ default: 0 })
    grade: number;

    @Column({ default: null })
    token: string;

    @Column({ default: null })
    tel: string;

    @Column({ default: '来个签名' })
    signature: string;
}