import express from 'express'
import { signupUser } from '../controllers/user.js'


const router = express.Router();


router.post('/signup' , signupUser ); //for registering user 





export default router;