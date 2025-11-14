import { sequelize } from '../src/config/database.js';
import { PersonModel } from '../src/models/person.model.js';
import { UserModel } from '../src/models/user.model.js';
import { SuperheroModel } from '../src/models/superhero.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Tablas eliminadas y recreadas.');

    // Usuarios fijos
    const fixedUsers = [
      {
        name: 'Admin',
        lastname: 'Root',
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
      },
      {
        name: 'Usuario',
        lastname: 'Normal',
        username: 'user',
        email: 'user@example.com',
        password: 'user123',
      },
    ];

    for (const fixedUser of fixedUsers) {
      const person = await PersonModel.create({
        name: fixedUser.name,
        lastname: fixedUser.lastname,
      });
      await UserModel.create({
        username: fixedUser.username,
        email: fixedUser.email,
        password: fixedUser.password,
        person_id: person.id,
      });
    }
    console.log('Usuarios creados.');

    // Cargar superhéroes desde el archivo JSON
    const superheroesPath = path.join(
      __dirname,
      '../data/superheroes.json'
    );
    const superheroesData = JSON.parse(
      fs.readFileSync(superheroesPath, 'utf-8')
    );

    for (const superhero of superheroesData) {
      await SuperheroModel.create({
        superhero: superhero.superhero,
        publisher: superhero.publisher,
        alter_ego: superhero.alter_ego,
        first_appearance: superhero.first_appearance,
        characters: superhero.characters,
        image: superhero.image,
      });
    }
    console.log('Superhéroes creados.');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  } finally {
    await sequelize.close();
    process.exit();
  }
}

seed();
