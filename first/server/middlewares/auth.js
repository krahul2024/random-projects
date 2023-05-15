import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const age = 3*24*3600 

const auth = async (req, res ,  next) => {
	// console.log(req.cookies.jwt_cookie)
	try{
		const token = req.cookies.jwt_cookie  
		const verify_token = jwt.verify(token , "Thisismysecretkeyforjsonwebtoken") 
		// console.log(verify_token)
		const user = await User.findOne({_id:verify_token._id,"tokens.token":token})
		// console.log(user)
		if(!user) throw new Error("This user is not permitted or not found!");
		req.token = token 
		req.user = user 
		req.user_id = user._id 
		next()
	}
	catch(error) {
		res.status(403).send({
			success:false,
			msg:'Unauthorized',
			toPath:'/login'
		})
		console.log('There was an error during authorization....')
	}
}

export default auth