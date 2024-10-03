import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../entity/produto.entity';
import { ProdutoLoja } from '../entity/produtoloja.entity';
import { Loja } from '../entity/loja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, ProdutoLoja, Loja])],
  controllers: [ProdutosController],
  providers: [ProdutosService]
})
export class ProdutosModule {}
