import { SuperheroModel } from '../models/superhero.model.js';
import { sequelize } from '../config/database.js';

export const getRandomSuperheroes = async (req, res) => {
  try {
    // Obtener todos los superhéroes en orden aleatorio
    const superheroes = await SuperheroModel.findAll({
      order: sequelize.random(),
    });

    return res.json({
      message: 'Superhéroes obtenidos exitosamente',
      data: superheroes,
    });
  } catch (error) {
    console.error('Error al obtener superhéroes:', error);
    return res.status(500).json({
      message: 'Error al obtener superhéroes',
      error: error.message,
    });
  }
};
