import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from "typeorm";

@Entity()
@Unique(['produto', 'loja'])
export class ProdutoLoja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    preco: number;
}