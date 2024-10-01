import { Module } from '@nestjs/common';
import { LojasService } from './lojas.service';
import { LojasController } from './lojas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from '../entity/loja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loja])],
  providers: [LojasService],
  controllers: [LojasController]
})
export class LojasModule {}
