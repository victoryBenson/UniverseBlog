import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user";

const router = Router()

router.get('/getUser/:id', getUser)
router.get('/getUsers', getUsers)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)


export default router