import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user";
import protect from "../middleware/authMiddleware";
 
const router = Router()

router.use(protect)

router.get('/getUser/:id', getUser)
router.get('/getUsers', getUsers)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)


export default router;