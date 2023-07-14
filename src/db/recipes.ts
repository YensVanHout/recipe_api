import mongoose from "mongoose";

const recipeScheme = new mongoose.Schema({
  title: { type: String },
  ingredients: { type: Array<String> },
  steps: { type: Array<String> },
  tags: { type: Array<String> },
});

export const recipeModel = mongoose.model("Recipe", recipeScheme);

export const GetRecipes = () => recipeModel.find();
export const GetRecipeById = (id: string) => recipeModel.findOne({ _id: id });

export const GetRandomRecipe = () => {
  return recipeModel.aggregate([{ $sample: { size: 1 } }]);
};

export const CreateRecipe = (values: Record<string, any>) =>
  new recipeModel(values.body).save().then((recipe) => recipe.toObject());
export const DeleteRecipeById = (id: string) =>
  recipeModel.findByIdAndDelete({ _id: id });

export const UpdateRecipeById = (id: string, values: Record<string, any>) =>
  recipeModel.findByIdAndUpdate(id, values);
