import { CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";


export abstract class Common {
    @CreateDateColumn({type:'timestamp'})
    createTime:Date;

    @UpdateDateColumn({type:'timestamp'})
    updateTime:Date;
}