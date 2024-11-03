import { db } from './db.config';
import { tasks, users } from './schemas/index.schema';
import * as argon from 'argon2'

async function seed() {
  console.info('Running seeders...');
  try {
    // Clear database
    await db.delete(users);
    await db.delete(tasks);

    // Insert results
    const testPass = await argon.hash('test')
    const result = await db.insert(users).values([
      {
        id: '2f7be137-517e-49dd-b752-5b00de61e223',
        username: 'user1',
        password: testPass,
      },
      {
        id: 'b5e4e5f5-90db-4e5f-bb3f-baabb816740d',
        username: 'user2',
        password: testPass,
      },
    ]);
    console.info('Insert to users table: ', result);

    console.info('Seed success!');
  } catch (error) {
    console.error('Error seeding...', error);
  }

  await db.$client.end();
}

seed();
