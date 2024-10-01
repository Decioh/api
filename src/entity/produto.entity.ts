import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;

    @Column()
    custo: number;

    @Column('bytea', { nullable: true })
    imagem: string;

}

