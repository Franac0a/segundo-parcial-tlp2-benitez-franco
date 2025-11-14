import { Router } from "express";
import { getRandomSuperheroes } from "../controllers/superhero.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const superheroRoutes = Router();

// Ruta para obtener superhéroes de forma aleatoria
superheroRoutes.get("/superheroes", authMiddleware, getRandomSuperheroes);
