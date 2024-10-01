import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Loja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;
}