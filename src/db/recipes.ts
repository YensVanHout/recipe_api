import mongoose from "mongoose";

const recipeScheme = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: Array<String>, required: true },
  steps: { type: Array<String>, required: true },
  tags: { type: Array<String>, required: true },
});

export const recipeModel = mongoose.model("Recipe", recipeScheme);

export const getRecipes = () => recipeModel.find();
export const getRecipeById = (id: string) => recipeModel.findOne({ _id: id });
export const getRandomRecipe = () => {};
export const createRecipe = (values: Record<string, any>) => {
  new recipeModel(values.body).save().then((recipe) => recipe.toObject());
};

export const deleteRecipeById = (id: string) =>
  recipeModel.findByIdAndDelete({ _id: id });

export const updateRecipeById = (id: string, values: Record<string, any>) =>
  recipeModel.findByIdAndUpdate(id, values);
