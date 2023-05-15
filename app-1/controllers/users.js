import users from '../models/user.js';
//reading part or getting the user information
export const getUser = async (req, res) => {
	try {
		const {
			id
		} = req.params;
		const user = await users.findById(id); //looking for user using the id we got from request
		res.status(200).json(user);

	} catch (err) {
		res.status(404).json({ //in case of any errors
			message: err.message
		});
	}
}

export const getUserFriends = async (req, res) => {
	try {
		const {
			id
		} = req.params;
		const user = await users.findById(id); //finding the user by id

		const friends = await Promise.all( //promise.all is for even if one promise is rejected then we won't get resolve
			user.friends.map((id) => users.findById(id))); //here we are taking all the ids one by one
		// from list of friends of the user and finding all the friends information by their ids
		const formattedFriends = friends.map(({
			_id,
			firstName,
			lastName,
			occupation,
			location,
			picturePath
		}) => {
			return { //returning the formatted object to the frontend
				_id,
				firstName,
				lastName,
				occupation,
				location,
				picturePath
			}
		});
		res.status(200).json(formattedFriends);
	} catch (err) {
		res.status(404).json({
			message: err.message
		});
	}
}

//update like add or remove friends from the user's friend list

export const addRemoveFriend = async (req, res) => {
	try {
		const {
			id,
			friendId
		} = req.params;
		const user = await users.findById(id); //finding the user 
		const friend = await users.findById(friendId); //finding the friend

		if (user.friends.includes(friendId)) {
			user.friends = user.friends.filter((id) => id !== friendId); //removing the user if it is friend of the user already
			friend.friends = friend.friends.filter((id) => id !== id); //also removing user from list of friends of friend
		} else { //adding one another as their friends
			user.friends.push(friendId);
			friend.friends.push(id);
		}

		await user.save();//saving the changes made
		await friend.save();

		//formatting the friends list
		const friends = await Promise.all( //promise.all is for even if one promise is rejected then we won't get resolve
			user.friends.map((id) => users.findById(id))); //here we are taking all the ids one by one
		// from list of friends of the user and finding all the friends information by their ids
		const formattedFriends = friends.map(({
			_id,
			firstName,
			lastName,
			occupation,
			location,
			picturePath
		}) => {
			return { //returning the formatted object to the frontend
				_id,
				firstName,
				lastName,
				occupation,
				location,
				picturePath
			}
		});
		res.status(200).json(formattedFriends);//sending the formatted list of friends to the frontend
	} 
	catch (err) {
		res.status(404).json({
			message: err.message
		})
	}
}