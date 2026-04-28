import {
    createIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredient,
    deleteIngredient,
}
    from '../repositories/ingredientRepo.js';

export async function addIngredient(data) {
    try {
        return await createIngredient(data);
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('Ingredient already exists');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function findAllIngredients() {
    return getAllIngredients();
}

export async function findIngredientById(id) {
    const ingredient = await getIngredientById(id);

    if (!ingredient) {
        const error = new Error('Ingredient not found');
        error.status = 404;
        throw error;
    }

    return ingredient;
}

export async function editIngredient(id, data) {
    await findIngredientById(id);
    return updateIngredient(id, data);
}

export async function removeIngredient(id) {
    await findIngredientById(id);
    return deleteIngredient(id);
}