import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Loja } from './entity/loja.entity';
import { ProdutoLoja } from './entity/produtoloja.entity';
import { Produto } from './entity/produto.entity';
import { seedDB } from './seed/seed';
import "reflect-metadata"; 

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DB'),
  entities: [Loja, ProdutoLoja, Produto],
  migrations: ['src/migration/*{.ts}'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    seedDB();
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });