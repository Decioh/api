import { Module } from '@nestjs/common';
import { ProdutolojasController } from './produtolojas.controller';
import { ProdutolojasService } from './produtolojas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoLoja } from '../entity/produtoloja.entity';
import { Loja } from '../entity/loja.entity';
import { Produto } from '../entity/produto.entity';
import { ProdutosService } from '../produtos/produtos.service';
@Module({
  imports: [TypeOrmModule.forFeature([ProdutoLoja, Loja, Produto])],
  controllers: [ProdutolojasController],
  providers: [ProdutolojasService, ProdutosService],
})
export class ProdutolojasModule {}