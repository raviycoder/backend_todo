import { Request, Response, Router } from "express";
import { createUser, getUser, login, updatePassword, updateUser } from "../controllers/auth.controller";
import { isAuth } from "../middlewares/isAuth";


const router = Router()

router.post('/signup', createUser);
router.post('/login', login)
router.get('/user', isAuth, getUser)
router.patch('/update-user', isAuth, updateUser)
router.patch('/update-password', isAuth, updatePassword)

export default router;