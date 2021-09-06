import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('test')

export class gg {
    @PrimaryGeneratedColumn()
    tid: number;

    @CreateDateColumn({ type: 'timestamp' })
    startTime: Date;

    @Column({
        type: 'timestamp',
        onUpdate: 'current_timestamp',
        default: () => 'current_timestamp',
    })
    updateAt: Timestamp;
    
    @UpdateDateColumn()
    updateTime: Date;

    @Column()
    test: string;
}