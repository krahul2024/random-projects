import express from 'express'
const router = express.Router()
import { user_login , user_register , update_password , forgot_password , reset_password } from '../controllers/user.js'
import { verify_user } from '../middleware/auth.js'

router.get('/' , (req , res) => {
	res.send('this is user homepage')
})

router.post('/login' , user_login)

router.post('/register' , user_register) 

router.post('/update_password' , verify_user , update_password) 

router.post('/forgot' , forgot_password) 

router.get('/reset' , reset_password)



export default router

//for conversion to json use JSON.strigify() and back from json to JSON.parse()