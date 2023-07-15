// Validate recipes
import { body, ValidationChain } from 'express-validator';

export const recipeValidator: ValidationChain[] = [
  body('title').notEmpty().withMessage('Title is needed.'),
  body('ingredients').notEmpty().isArray().withMessage('Ingredients must be in an array.'),
  // More validation rules can be implemented here
];
