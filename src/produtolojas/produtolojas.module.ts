import { Module } from '@nestjs/common';
import { ProdutolojasController } from './produtolojas.controller';
import { ProdutolojasService } from './produtolojas.service';

@Module({
  controllers: [ProdutolojasController],
  providers: [ProdutolojasService]
})
export class ProdutolojasModule {}
