import express from 'express';
import * as controllers from '../controllers/app_controller.js'
import {auth,local_variables} from '../middleware/auth.js'
import {register_mail} from '../controllers/mailer.js'
const router=express.Router();

//-------------------POST methods------------------------------
router.post('/register',controllers.register);

// router.post('/authenticate',controllers.);

router.post('/login',controllers.verify_user,controllers.login);//first verifying the user and then going for login

router.post('/register_mail',register_mail);


//-------------------GET methods-------------------------------
router.get('/',(req,res)=>{
	res.send('This is the api homepage.')
});

router.get('/user/:username',controllers.get_user);

router.get('/generate_otp',controllers.verify_user,local_variables,controllers.generate_otp);

router.get('/verify_otp',controllers.verify_otp);

router.get('/create_reset_session',controllers.create_reset_session);



//-----------------------------PUT methods---------------------------------
router.put('/update_user',auth,controllers.update_user);

router.put('/reset_password',controllers.verify_user,controllers.reset_password);



export default router;