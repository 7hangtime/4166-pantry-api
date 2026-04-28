import {
    addIngredient,
    findAllIngredients,
    findIngredientById,
    editIngredient,
    removeIngredient,
} from '../services/ingredientService.js';

export async function createIngredientHandler(req, res) {
    const ingredient = await addIngredient(req.body);
    res.status(201).json(ingredient);
}

export async function getIngredientsHandler(req, res) {
    const ingredients = await findAllIngredients();
    res.status(200).json(ingredients);
}

export async function getIngredientByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const ingredient = await findIngredientById(id);
    res.status(200).json(ingredient);
}

export async function updateIngredientHandler(req, res) {
    const id = parseInt(req.params.id);
    const ingredient = await editIngredient(id, req.body);
    res.status(200).json(ingredient);
}

export async function deleteIngredientHandler(req, res) {
    const id = parseInt(req.params.id);
    const ingredient = await removeIngredient(id);
    res.sendStatus(204);
}