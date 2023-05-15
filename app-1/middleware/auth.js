import jwt form 'jsonWebToken';

export const verifyToken = async (req, res, next) => {
	try {
		let token = req.header("Authorization");
		if (!token) {
			return res.status(403).send('Access denied!'); //in the case when there is no token or the user is not signed in
		}

		//Authorization: Bearer eyJhbGciOiJIUzI1NiIXVCJ9...TJVA95OrM7E20RMHrHDcEfxjoYZgeFONFh7HgQ
		//the token has something like this in header if it is not null and then we can use this to authorize the user to access some stuff
		if (token.startsWith('Bearer ')) { //here we are making the created token to be something like this so that we can match
			token = token.slice(7, token.length).trimLeft();
		}

		const verified = jwt.verify(token, process.env.JWT_SECRET); //verifying the user
		req.user = verified;
		next(); //this is for letting the next function get executed

	} catch (err) {
		res.status(500).json({
			error: err.message
		});
	}
}