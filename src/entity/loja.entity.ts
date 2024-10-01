import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Loja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;

    }