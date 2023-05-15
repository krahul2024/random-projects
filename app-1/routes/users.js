import express from 'express';
import {
	getUser,
	getUserFriends,
	addRemoveFriend
} from '../controllers/users.js';
import {
	verifyToken
} from '../middleware/auth.js';

const router=express.Router();

//read operation just fetching some data about the user or their friends
router.get('/:id',verifyToken,getUser);
router.get('/:id/friends',verifyToken,getUserFriends);

//read and update operation , fetching and updating the data like adding friends or removing friends
router.patch('/:id/:friendId',verifyToken,addRemoveFriend);

export default router;