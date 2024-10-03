import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loja } from '../entity/loja.entity';

@Injectable()
export class LojasService {
    constructor(
        @InjectRepository(Loja)
        private lojaRepository: Repository<Loja>,
    ) {}

    // Retorna todas as lojas
    async findAll(): Promise<Loja[]> {
        try {
            return await this.lojaRepository.find();
        } catch (error) {
            throw new Error(`Error getting stores: ${error.message}`);
        }
    }

    // Retorna uma loja pelo id
    async findOne(id: number): Promise<Loja> {
        try {
            return await this.lojaRepository.findOne({ where: { id } });
        } catch (error) {
            throw new Error(`Error getting store: ${error.message}`);
        }
    }
}