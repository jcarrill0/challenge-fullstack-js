import { Router } from "express";
import { 
    getUser, 
    getUsers, 
    deleteUser, 
    updateUser
} from "../controllers/user.controller";


const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
