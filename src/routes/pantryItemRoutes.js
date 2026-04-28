import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizePantryItemOwner } from '../middleware/authorizePantryItemOwner.js';
import {
    createPantryItemHandler,
    getPantryItemsHandler,
    getPantryItemByIdHandler,
    updatePantryItemHandler,
    deletePantryItemHandler,
} from '../controllers/pantryItemController.js';

const router = express.Router();

router.post('/', authenticate, createPantryItemHandler);
router.get('/', authenticate, getPantryItemsHandler);
router.get('/:id', authenticate, authorizePantryItemOwner, getPantryItemByIdHandler);
router.put('/:id', authenticate, authorizePantryItemOwner, updatePantryItemHandler);
router.delete('/:id', authenticate, authorizePantryItemOwner, deletePantryItemHandler);

export default router;