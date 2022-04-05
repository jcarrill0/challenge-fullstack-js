import { Router } from "express";
import { 
    getIncome, 
    getIncomes, 
    postIncome, 
    deleteIncome, 
    updateIncome
} from "../controllers/income.controller";


const router = Router();

router.get('/', getIncomes);
router.get('/:id', getIncome);
router.post('/', postIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

export default router;
