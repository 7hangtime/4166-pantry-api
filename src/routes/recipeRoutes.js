import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
    createRecipeHandler,
    getRecipesHandler,
    getRecipeByIdHandler,
    updateRecipeHandler,
    deleteRecipeHandler,
} from '../controllers/recipeController.js';

const router = express.Router();

router.post('/', authenticate, createRecipeHandler);
router.get('/', getRecipesHandler);
router.get('/:id', getRecipeByIdHandler);
router.put('/:id', authenticate, updateRecipeHandler);
router.delete('/:id', authenticate, deleteRecipeHandler);

export default router;