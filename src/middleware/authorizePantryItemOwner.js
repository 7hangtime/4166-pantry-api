import { findPantryItemById } from '../services/pantryItemService.js';

export async function authorizePantryItemOwner(req, res, next) {
    const id = parseInt(req.params.id);
    const pantryItem = await findPantryItemById(id);

    if (req.user.role === 'ADMIN') {
        return next();
    }

    if (pantryItem.userId !== req.user.id) {
        const error = new Error('Forbidden: insufficient permission.');
        error.status = 403;
        return next(error);
    }

    next();
}