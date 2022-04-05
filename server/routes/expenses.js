import { Router } from "express";
import { 
    getExpense, 
    getExpenses, 
    postExpense, 
    deleteExpense, 
    updateExpense
} from "../controllers/expense.controller";


const router = Router();

router.get('/', getExpenses);
router.get('/:id', getExpense);
router.post('/', postExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
