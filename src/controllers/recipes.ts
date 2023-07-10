import express from "express";
import { deleteRecipeById, getRecipeById, getRecipes } from "../db/recipes";
import { createScanner } from "typescript";

export const getAllRecipes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const recipes = await getRecipes();
    return res.json(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteRecipe = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await deleteRecipeById(id);
    res.json(deletedRecipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateRecipe = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { title, ingredients, steps, tags } = req.body;
    const recipe = await getRecipeById(id);

    if (recipe) {
      if (recipe.title !== title) {
        recipe.title = title;
      }
      if (recipe.ingredients !== ingredients) {
        recipe.ingredients = ingredients;
      }
      if (recipe.steps !== steps) {
        recipe.steps = steps;
      }
      if (recipe.tags !== tags) {
        recipe.tags = tags;
        await recipe.save();
      }
      return res.json(recipe);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
