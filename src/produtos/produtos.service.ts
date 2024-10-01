import { Injectable } from '@nestjs/common';
import { Produto } from '../entity/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutosService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
    ) {}
    //Retorna todos os produtos
    async findall(): Promise<Produto[]> {
        return this.produtoRepository.find();
    }
    //Retorna um produto pelo id
    async findone(id: number): Promise<Produto> {
        return await this.produtoRepository.findOne({ where: { id } }); 
    }
    //Cria um novo produto
    async create(produto: Produto): Promise<Produto> {
        const newProduto = this.produtoRepository.create(produto);
        return this.produtoRepository.save(produto);
    }
    
    //Atualiza um produto
    async update(id: number, produto: Produto): Promise<Produto> {
        const updatedProduto = await this.produtoRepository.findOne({ where: { id } });
        if (!updatedProduto) {
            return null;
        }
        await this.produtoRepository.update(id, produto);
    }
    
    //Deleta um produto
    async remove(id: number): Promise<void> {
        await this.produtoRepository.delete(id);
    }
    
}
