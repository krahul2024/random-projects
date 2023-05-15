import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


const Register = () => {

const [name,setName] = useState('');
const [email, setEmail] = useState('');
const [password,setPassword] = useState('');

const registerUser = async (ev) =>{
	ev.preventDefault();//this is so that page is not reloaded
	
	try{
		await axios.post('/register',{
				name,
				email,
				password
			});
			alert('Registration Successfull. You are welcome to login.');
	}catch(err){
		alert('Registration failed! Please try again later');
	}
	

}

return (
		<div className="mt-4 grow flex items-center justify-around">

		<div className="mb-8">

		<h2 className="text-3xl text-center text-emerald-800 font-bold mb-4">Register</h2>

		<form action="" className="max-w-md mx-auto items-center" onSubmit={registerUser}>
			<input type="text" placeholder="Your Name"
					value={name} onChange={ ev => setName(ev.target.value)} />

			<input type="email" name="email" placeholder="email@email.com"
					value={email} onChange={ ev => setEmail(ev.target.value)} />

			<input type="password" name="password" placeholder="Password" 
					value={password} onChange={ ev=> setPassword(ev.target.value)} />

			<button className="text-white p-2 w-full mt-2 rounded-full bg-primary">
			Go
			</button>
			<div className="text-center text-md text-gray-500 mt-1"> 
				Already Registered? 
				<Link to={"/login"} className="text-red-500 font-medium">  Login Now</Link>
			</div>

		</form>
	</div>
	</div>

	

)

}

export default Register;