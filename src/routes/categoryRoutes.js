import express from 'express';
import { CategoryController } from '../controllers/categoryController.js';

const router = express.Router();
router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.addCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);
router.get('/:id', CategoryController.getCategoryById);
export default router;
