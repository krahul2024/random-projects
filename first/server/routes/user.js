import express from 'express'
// import cookie_parser from 'cookie-parser'
const router = express.Router() // for routing to http://localhost:PORT/user/anything
import { register_user , login_user , update_user, reset_password } from '../controllers/user.js'
import auth from '../middlewares/auth.js'
//---------------------------------- All Get requests ---------------------
router.get('/', (req,res) => {
	res.send(`This is me from path /user.....`)
})

router.get('/profile',auth,(req,res)=>{
	res.status(200).send({
		msg:'login successful',
		success:true,
		user:req.user
	})
})


//-----------------------All Post requests ---------------------------
router.post('/register', register_user ) ;
router.post('/login', login_user)
router.post('/update',auth,update_user) 





export default router 