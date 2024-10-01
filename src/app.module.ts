import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProdutosModule } from './produtos/produtos.module';
import { LojasModule } from './lojas/lojas.module';
import { ProdutolojasModule } from './produtolojas/produtolojas.module';
import { Loja } from './entity/loja.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DB'),
        entities: [Loja],
        migrations: ['src/migration/**/*.ts'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ProdutosModule,
    LojasModule,
    ProdutolojasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}