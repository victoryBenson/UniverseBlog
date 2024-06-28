import { Router } from "express";
import { getUser, getUsers, updateUser } from "../controllers/user";

const router = Router()

router.get('/getUser/:id', getUser)
router.get('/getUsers', getUsers)
router.patch('/updateUser', updateUser)


export default router