import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProdutoLoja } from "./produtoloja.entity";

@Entity()
export class Loja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 60, nullable: true })
    descricao: string;

    @OneToMany(() => ProdutoLoja, produtoLoja => produtoLoja.produto, {cascade: true})
    produtoLoja: ProdutoLoja[];
    

}
