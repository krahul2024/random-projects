import jwt from 'jsonwebtoken'

const secret = "thisismysecretkeyanditisvisibletoeverybody"

export const verify_user = async (req , res , next) => {

	const token = req.body.token || req.query.token || req.headers["Authorization"]
	console.log(token)
	console.log()

	if(!token) return res.status(400).send({
		success : false,
		msg : "Token required...."
	})

	 try{

	 	const user = await jwt.verify(token , secret ) 
	 	console.log(user)
	 	req.user = user 

	 }
	catch (error) {

		return res.status(300).send({
			success : false,
			error ,
			msg : "Not authorized... "
		})

	}

	return next(); 
}