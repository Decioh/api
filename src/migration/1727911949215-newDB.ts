import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewDB1727911949215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criar tabelas
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "produto" (
                "id" SERIAL PRIMARY KEY,
                "descricao" VARCHAR(60) NOT NULL,
                "custo" NUMERIC(13, 3),
                "imagem" BYTEA
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "loja" (
                "id" SERIAL PRIMARY KEY,
                "descricao" VARCHAR(60)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "produtoloja" (
                "id" SERIAL PRIMARY KEY,
                "precoVenda" NUMERIC(13, 3),
                "produtoId" INTEGER NOT NULL,
                "lojaId" INTEGER NOT NULL
            );
        `);

        // Adicionar chaves estrangeiras
        await queryRunner.query(`
            ALTER TABLE "produtoloja"
            ADD CONSTRAINT "FK_produto" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE NO ACTION;
        `);

        await queryRunner.query(`
            ALTER TABLE "produtoloja"
            ADD CONSTRAINT "FK_loja" FOREIGN KEY ("lojaId") REFERENCES "loja"("id") ON DELETE NO ACTION;
        `);

        // Adicionar constraint única
        await queryRunner.query(`
            ALTER TABLE "produtoloja"
            ADD CONSTRAINT "UQ_produtoloja" UNIQUE ("produtoId", "lojaId");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover constraints
        await queryRunner.query(`ALTER TABLE "produtoloja" DROP CONSTRAINT "UQ_produtoloja"`);
        await queryRunner.query(`ALTER TABLE "produtoloja" DROP CONSTRAINT "FK_loja"`);
        await queryRunner.query(`ALTER TABLE "produtoloja" DROP CONSTRAINT "FK_produto"`);

        // Remover tabelas
        await queryRunner.query(`DROP TABLE IF EXISTS "produtoloja"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "produto"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "loja"`);
    }
}
