import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import {
    createIngredientHandler,
    getIngredientsHandler,
    getIngredientByIdHandler,
    updateIngredientHandler,
    deleteIngredientHandler,
} from '../controllers/ingredientController.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('ADMIN'), createIngredientHandler);
router.get('/', authenticate, getIngredientsHandler);
router.get('/:id', authenticate, getIngredientByIdHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateIngredientHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteIngredientHandler);

export default router;