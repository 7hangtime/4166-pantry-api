import { handleValidationErrors } from './handleValidationErrors.js';
import { body } from 'express-validator';

export const validateSignUp = [
    body('username')
        .trim()
        .exists({ values: 'falsy' })
        .withMessage('Username is required')
        .bail()
        .isLength({ min: 3, max: 32 })
        .withMessage('Username must contain at least 3 characters and at most 32 characters'),

    body('password')
        .exists({ values: 'falsy' })
        .withMessage('Password is required')
        .bail()
        .isLength({ min: 8, max: 64 })
        .withMessage('Password must contain at least 8 characters and at most 64 characters'),

    body('role')
        .optional()
        .isIn(['USER', 'ADMIN'])
        .withMessage('Role must be either USER or ADMIN'),

    handleValidationErrors,
];

export const validateLogIn = [
    body('username')
        .trim()
        .exists({ values: 'falsy' })
        .withMessage('Username is required'),

    body('password')
        .exists({ values: 'falsy' })
        .withMessage('Password is required'),

    handleValidationErrors,
];