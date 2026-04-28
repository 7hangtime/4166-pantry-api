import {
    addPantryItem,
    findPantryItemsByUserId,
    findPantryItemById,
    editPantryItem,
    removePantryItem,
} from '../services/pantryItemService.js';

export async function createPantryItemHandler(req, res) {
    const pantryItem = await addPantryItem(req.user.id, req.body);
    res.status(201).json(pantryItem);
}

export async function getPantryItemsHandler(req, res) {
    const pantryItems = await findPantryItemsByUserId(req.user.id);
    res.status(200).json(pantryItems);
}

export async function getPantryItemByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const pantryItem = await findPantryItemById(id);
    res.status(200).json(pantryItem);
}

export async function updatePantryItemHandler(req, res) {
    const id = parseInt(req.params.id);
    const pantryItem = await editPantryItem(id, req.body);
    res.status(200).json(pantryItem);
}

export async function deletePantryItemHandler(req, res) {
    const id = parseInt(req.params.id);
    const pantryItem = await removePantryItem(id);
    res.sendStatus(204);
}