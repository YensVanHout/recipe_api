import { CreateRecipe, GetRandomRecipe } from "./../db/recipes";
import express from "express";
import { DeleteRecipeById, GetRecipeById, GetRecipes } from "../db/recipes";

export const getRecipe = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const sample: number = +req.query.sample! || 1;
    let recipe;

    id != "random"
      ? (recipe = await GetRecipeById(id))
      : (recipe = await GetRandomRecipe(sample));

    recipe
      ? res.json(recipe)
      : id == "random"
      ? res.json({ msg: "Could not fetch recipe, try again laster" })
      : res.json({ msg: "Could not find recipe" });
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
    const sort: string =
      req.query.sort!.toString() == "asc" ? "asc" : "desc" || "asc";

    const recipes = await GetRecipes(page, limit, sort);
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
    const { title, time, ingredients, tools, steps, tags } = req.body;
    const recipe = await GetRecipeById(id);

    if (recipe) {
      if (recipe.title !== title) {
        recipe.title = title;
      }
      if (recipe.time !== time) {
        recipe.time = time;
      }
      if (recipe.ingredients !== ingredients) {
        recipe.ingredients = ingredients;
      }
      if (recipe.tools !== tools) {
        recipe.tools = tools;
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
    const { title, time, ingredients, tools, steps, tags } = req.body;

    const recipe = {
      title: title,
      time: time,
      ingredients: ingredients,
      tools: tools,
      steps: steps,
      tags: tags,
    };

    const newRecipe = await CreateRecipe(recipe);
    return res.status(201).json({ _id: newRecipe });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
