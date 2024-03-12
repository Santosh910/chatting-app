import {Router} from 'express';
import { getMessages, sendMesaage } from '../controllers/Message.js';
import protectRoute from '../middleware/protectRoute.js';


const router = Router();

router.post('/send/:id',protectRoute,sendMesaage)
router.get('/:id',protectRoute,getMessages)



export default router