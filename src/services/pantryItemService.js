import {
    createPantryItem,
    getPantryItemsByUserId,
    getPantryItemById,
    updatePantryItem,
    deletePantryItem,
} from '../repositories/pantryItemRepo.js';

export async function addPantryItem(userId, data) {
    try {
        return await createPantryItem({
            ...data,
            userId,
        });
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('Pantry item already exists for this user');
            err.status = 409;
            throw err;
        }

        if (error.code === 'P2003') {
            const err = new Error('Ingredient does not exist');
            err.status = 404;
            throw err;
        }

        throw error;
    }
}

export async function findPantryItemsByUserId(userId) {
    return getPantryItemsByUserId(userId);
}

export async function findPantryItemById(id) {
    const pantryItem = await getPantryItemById(id);

    if (!pantryItem) {
        const error = new Error('Pantry item not found');
        error.status = 404;
        throw error;
    }

    return pantryItem;
}

export async function editPantryItem(id, data) {
    await findPantryItemById(id);
    return updatePantryItem(id, data);
}

export async function removePantryItem(id) {
    await findPantryItemById(id);
    return deletePantryItem(id);
}