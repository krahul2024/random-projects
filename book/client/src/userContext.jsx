import React, { createContext} from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'


export const UserContext = createContext({});


export const UserContextProvider = ({ children }) => {

	const [user,setUser]=useState(null);

	//this is for getting information of user from profile path or endpoint
	useEffect(() => {
		if(!user){
		 axios.get('/profile').then((data) =>{
			setUser(data);
		});
		}

	}, [])


    return (
    	<UserContext.Provider value={{user,setUser}}>
    	{ children }

    	</UserContext.Provider>

    	);
}



