import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from "typeorm";
import { Produto } from "./produto.entity"; // Make sure to import the Produto entity
import { Loja } from "./loja.entity"; // Make sure to import the Loja entity

@Entity()
@Unique(['produto', 'loja'])
export class ProdutoLoja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('numeric', { precision: 13, scale: 3, nullable: true,  })
    preco: number;

    @ManyToOne(() => Produto, produto => produto.produtoLoja,{onDelete: 'CASCADE', nullable: false})
    produto: Produto;

    @ManyToOne(() => Loja, loja => loja.produtoLoja,{onDelete: 'CASCADE', nullable: false})
    loja: Loja;
}