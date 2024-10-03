import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from "typeorm";
import { Produto } from "./produto.entity"; 
import { Loja } from "./loja.entity";

@Entity()
@Unique(['produto', 'loja'])
export class ProdutoLoja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('numeric', { precision: 13, scale: 3, nullable: true,  })
    precoVenda: number;

    @ManyToOne(() => Produto, (produto) => produto.id, {
        nullable: false,
        onDelete: 'CASCADE',
      })
      produto:Produto;

    @ManyToOne(() => Loja, (loja) => loja.id, { nullable: false, onDelete: 'CASCADE' })
      loja: Loja;
}