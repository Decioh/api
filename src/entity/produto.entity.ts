import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from "typeorm";
import { ProdutoLoja } from "./produtoloja.entity";

@Entity()

export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 60, nullable: false })
    descricao: string;

    @Column({ type: 'numeric', precision: 13, scale: 3, nullable: true })
    custo: number;

    @Column('bytea', { nullable: true })
    imagem: string;

    @OneToMany(() => ProdutoLoja, (produtoLoja) => produtoLoja.produto, { cascade: true })
    produtoloja: ProdutoLoja[];

    //Criar construtor para a entidade Produto, parar mockar informações para testes
    
    constructor(produto?: Partial<Produto>) {
        this.id = produto?.id;
        this.descricao = produto?.descricao;
        this.custo = produto?.custo;
        this.imagem = produto?.imagem;
    }
}

