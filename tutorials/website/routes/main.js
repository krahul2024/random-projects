const express = require('express');
const router = express.Router();
const navbar = require('../models/details.js');
const slider = require('../models/slider.js');
router.get('/', (request, response) => {
	//this is when we are checking if there is data in navigation then we are proceeding to the next part
	navbar.find((error, result) => {
		if (error) console.log('There was an error');
		else {
			let navigationBarItems = result[0];
			// console.log(navigationBarItems);
			//now checking for the slider part if there is data available in the slider part if there is then we will send o/w we have a problem ready
			slider.find((error, result) => {
				if (error) console.log('There was an error');
				else {
					let sliderItems = result;
					console.log(navigationBarItems);
					response.render('./index', {
						navigationBarItems: navigationBarItems,
						sliderItems: sliderItems
					})
				}
			})
			// response.render('./index', {
			// 	navigationBarItems: navigationBarItems
			// })
		}
	})

});



module.exports = router;