import {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
} from '../repositories/recipeRepo.js';

export async function addRecipe(data) {
    return createRecipe(data);
}

export async function findAllRecipes() {
    return getAllRecipes();
}

export async function findRecipeById(id) {
    const recipe = await getRecipeById(id);

    if (!recipe) {
        const error = new Error('Recipe not found');
        error.status = 404;
        throw error;
    }

    return recipe;
}

export async function editRecipe(id, data) {
    await findRecipeById(id);
    return updateRecipe(id, data);
}

export async function removeRecipe(id) {
    await findRecipeById(id);
    return deleteRecipe(id);
}