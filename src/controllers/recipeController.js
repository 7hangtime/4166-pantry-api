import {
    addRecipe,
    findAllRecipes,
    findRecipeById,
    editRecipe,
    removeRecipe,
} from '../services/recipeService.js';

export async function createRecipeHandler(req, res) {
    const recipe = await addRecipe(req.body);
    res.status(201).json(recipe);
}

export async function getRecipesHandler(req, res) {
    const recipes = await findAllRecipes();
    res.status(200).json(recipes);
}

export async function getRecipeByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const recipe = await findRecipeById(id);
    res.status(200).json(recipe);
}

export async function updateRecipeHandler(req, res) {
    const id = parseInt(req.params.id);
    const recipe = await editRecipe(id, req.body);
    res.status(200).json(recipe);
}

export async function deleteRecipeHandler(req, res) {
    const id = parseInt(req.params.id);
    const recipe = await removeRecipe(id);
    res.sendStatus(204);
}