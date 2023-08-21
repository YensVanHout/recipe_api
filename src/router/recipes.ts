import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRandomRecipe,
  getRecipe,
  updateRecipe,
} from "../controllers/recipes";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/recipes", getAllRecipes);
  router.get("/recipes/:id", getRecipe);
  router.get("/recipes/randomRecipe", getRandomRecipe);
  router.post("/recipes/create", createRecipe);
  router.delete("/recipes/delete/:id", isAuthenticated, deleteRecipe);
  router.patch("/recipes/update/:id", isAuthenticated, updateRecipe);
};
