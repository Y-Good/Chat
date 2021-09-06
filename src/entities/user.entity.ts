import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    uid: number;
   
    @ApiProperty()
    @Column()
    username: string;

    @Column()
    nickname:string;

    @Column({select:false})
    password:string;

    @Column()
    email:string;

    @Column({default:3})
    sex:number;

    @Column({type:'bigint',default:null})
    birth:number;

    @Column({default:'user.png'})
    avatar:string;

    // @Column({type:'bigint',default:new Date().getTime()})
    // registerdate:number;
    @CreateDateColumn({type:'timestamp',comment:'注册时间'})
    createTime:Date;

    @UpdateDateColumn({type:'timestamp'})
    updateTime:Date;
    
    @Column({default:0})
    grade:number;

    @Column({default:null})
    token:string;

}