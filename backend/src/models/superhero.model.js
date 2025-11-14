import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const SuperheroModel = sequelize.define(
  'superhero',
  {
    superhero: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'superhero',
    },
    publisher: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'publisher',
    },
    alter_ego: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'alter_ego',
    },
    first_appearance: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'first_appearance',
    },
    characters: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'characters',
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'image',
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);
