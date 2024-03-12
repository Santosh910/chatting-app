import {Router} from 'express';
import authRoutes from './auth.routes.js'
import converRoutes from './connversation.routes.js'
import messageRoutes from './Message.route.js'
import userRoutes from './Users.routes.js'

const router = Router();

router.use('/auth',authRoutes)
router.use('/conver',converRoutes)
router.use('/mess',messageRoutes)
router.use('/user',userRoutes)

export default router