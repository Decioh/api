import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from "typeorm";
import { Produto } from "./produto.entity"; 
import { Loja } from "./loja.entity";

@Entity("produtoloja")
@Unique(['produto', 'loja'])
export class ProdutoLoja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('numeric', { nullable: true,  })
    precoVenda: number;

    @ManyToOne(() => Produto, (produto) => produto.id, {
        nullable: false,
        onDelete: 'CASCADE',
      })
      produto:Produto;

    @ManyToOne(() => Loja, (loja) => loja.id, { nullable: false, onDelete: 'CASCADE' })
      loja: Loja;

    //Criar construtor para a entidade ProdutoLoja, parar mockar informações para testes
    
    constructor(produtoloja?: Partial<ProdutoLoja>) {
      this.id = produtoloja?.id;
      this.precoVenda = produtoloja?.precoVenda;
      this.produto = produtoloja?.produto;
      this.loja = produtoloja?.loja;
    }
}