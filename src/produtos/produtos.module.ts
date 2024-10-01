import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../entity/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutosController],
  providers: [ProdutosService]
})
export class ProdutosModule {}
