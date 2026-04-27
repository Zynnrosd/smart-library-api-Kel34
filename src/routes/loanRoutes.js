import express from 'express';
import { LoanController } from '../controllers/loanController.js';

const router = express.Router();

router.get('/', LoanController.getAll);
router.post('/', LoanController.create);
router.put('/return/:id', LoanController.returnBook);

export default router;