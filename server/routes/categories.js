import { Router } from "express";
import { 
    getCategory, 
    getCategories, 
    postCategory, 
    deleteCategory, 
    updateCategory
} from "../controllers/category.controller";


const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', postCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
