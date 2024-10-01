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
    //Retorna todas as lojas
    async findall(): Promise<Loja[]> {
        return this.lojaRepository.find();
    }
    //Retorna uma loja pelo id
    async findOne(id: number): Promise<Loja> {
        return this.lojaRepository.findOne({ where: { id } });
    }
    //Cria uma nova loja
    async create(loja: Loja): Promise<Loja> {
        return this.lojaRepository.save(loja);
    }
    //Atualiza uma loja
    async update(id: number, loja: Loja): Promise<Loja> {
        await this.lojaRepository.update(id, loja);
        return await this.lojaRepository.findOne({ where : {id}});
    }
    //Remove uma loja
    async remove(id: number): Promise<void> {
        await this.lojaRepository.delete(id);
    }
}
