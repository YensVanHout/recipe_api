import { CreateRecipe, GetRandomRecipe } from "./../db/recipes";
import express from "express";
import { DeleteRecipeById, GetRecipeById, GetRecipes } from "../db/recipes";

export const getRecipe = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const recipe = await GetRecipeById(id);
    recipe
      ? res.json(recipe)
      : res.json({ msg: "Error while fetching recipe" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getRandomRecipe = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sample: number = +req.query.sample! || 1;
    const recipe = await GetRandomRecipe(sample);
    recipe
      ? res.json(recipe)
      : res.json({ msg: "Error while fetching recipe" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getAllRecipes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const page: number = +req.query.page! || 1;
    const limit: number = +req.query.limit! || 6;

    const recipes = await GetRecipes(page, limit);
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
    const deletedRecipe = await DeleteRecipeById(id);
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
    const recipe = await GetRecipeById(id);

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

export const createRecipe = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, ingredients, steps, tags } = req.body;

    const recipe = {
      title: title,
      ingredients: ingredients,
      steps: steps,
      tags: tags,
    };

    CreateRecipe(recipe);
    return res.json(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
