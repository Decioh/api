import { AppDataSource } from '../data-source';
import { Loja } from '../entity/loja.entity';

export async function seedDB() {

  const lojaRepository = AppDataSource.getRepository(Loja);

  const loja1 = new Loja();
  loja1.descricao = 'Loja 1';

  const loja2 = new Loja();
  loja2.descricao = 'Loja 2';

  await lojaRepository.save([loja1, loja2]);

  console.log('Seed data inserted');
  await AppDataSource.destroy();
}

seedDB().catch((error) => console.error('Error seeding data:', error));