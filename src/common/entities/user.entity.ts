import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "./interfaces/user.interface";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({ nullable: false })
    rank: number;
    @Column({ nullable: false })
    user: string;
    @Column()
    bitrh: number;
    @Column()
    rating: number;
    @Column()
    highest: number;
    @Column()
    match: number;
    @Column()
    win: number;
}