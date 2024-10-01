import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
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

    @OneToMany(() => ProdutoLoja, produtoLoja => produtoLoja.produto, {cascade: true})
    produtoLoja: ProdutoLoja[];
}

