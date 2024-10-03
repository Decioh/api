import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Loja } from './entity/loja.entity';
import { ProdutoLoja } from './entity/produtoloja.entity';
import { Produto } from './entity/produto.entity';

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DB'),
  entities: [Loja, ProdutoLoja, Produto],
  migrations: ['src/migration/*{.ts,.js}'],
  synchronize: true,
  dropSchema: true,

});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });