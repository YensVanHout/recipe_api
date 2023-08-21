import mongoose, { Schema, Types } from "mongoose";

const recipeScheme = new mongoose.Schema({
  title: { type: String },
  ingredients: { type: Array<String> },
  steps: { type: Array<String> },
  tags: { type: Array<String> },
});

export const recipeModel = mongoose.model("Recipe", recipeScheme);

export const GetRecipes = (
  pageNumber: number,
  nPerPage: number,
  sort: string
) => {
  const sortDirection = sort == "asc" ? 1 : -1;
  return recipeModel
    .find()
    .sort({ _id: sortDirection })
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage);
};
export const GetRecipeById = (id: string) => recipeModel.findOne({ _id: id });

export const GetRandomRecipe = (sample: number) => {
  return recipeModel.aggregate([{ $sample: { size: sample } }]);
};

export const CreateRecipe = async (values: Record<string, any>) => {
  let newRecipeId: Types.ObjectId | Schema.Types.ObjectId =
    await new recipeModel(values).save().then((recipe) => recipe._id);
  return newRecipeId;
};

export const DeleteRecipeById = (id: string) =>
  recipeModel.findByIdAndDelete({ _id: id });

export const UpdateRecipeById = (id: string, values: Record<string, any>) =>
  recipeModel.findByIdAndUpdate(id, values);
