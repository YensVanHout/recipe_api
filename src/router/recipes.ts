import express from "express";
import {
  deleteRecipe,
  getAllRecipes,
  updateRecipe,
} from "../controllers/recipes";
import { isAuthenticated } from "../middlewares";
import { createRecipe } from "../db/recipes";

export default (router: express.Router) => {
  router.post("/recipes/create", createRecipe);
  router.get("/recipes", getAllRecipes);
  router.delete("/recipes/delete/:id", isAuthenticated, deleteRecipe);
  router.patch("/recipes/update/:id", isAuthenticated, updateRecipe);
};
