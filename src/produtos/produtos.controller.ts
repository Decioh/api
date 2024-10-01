import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Produto } from '../entity/produto.entity';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) {}

    //Retorna todos os produtos
    @Get()
    async findAll(): Promise<Produto[]> {
        return this.produtosService.findall();
    }

    //Retorna um produto pelo id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Produto> {
        const prod = await this.produtosService.findone(id);
        if(!prod){
            throw new Error('Produto não encontrado');
        } else {
            return prod;
        }   
    }

    //Cria um novo produto
    @Post()
    async create(@Body() produto: Produto): Promise<Produto> {
        return this.produtosService.create(produto);
    }

    //Atualiza um produto
    @Put(':id')
    async update(@Param('id') id: number, @Body() produto: Produto): Promise<Produto> {
        return this.produtosService.update(id, produto);
    }

    //Deleta um produto
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const prod = await this.produtosService.findone(id);
        if(!prod){
            throw new Error('Produto não encontrado');
        }
        return this.produtosService.remove(id);  
    }
    
}
