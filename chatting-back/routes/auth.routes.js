import {Router} from 'express';
import { Login,  Signup, Logout } from '../controllers/auth.controller.js';


const router = Router();

router.post('/signup',Signup)
router.post('/login',Login)
router.post('/logout',Logout)
// router.post('/get-user',GetCurrentUser)
// router.get('/get-friends',getFriends)


export default router