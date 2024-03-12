import {Router} from 'express';
import { NewConv, getConvTwoId, getUserConv } from '../controllers/Conversation.js';


const router = Router();

router.post('/new-conv',NewConv)
router.get('/get-two',getConvTwoId)
router.get('/get-conv',getUserConv)


export default router