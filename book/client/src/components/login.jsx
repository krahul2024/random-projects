import React , {useState , useContext }from 'react'
import {Link,Navigate} from 'react-router-dom'
import axios from 'axios'
import {UserContext } from '../userContext.jsx'




const Login = () => {

	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [redirect,setRedirect] = useState(false);
	const {setUser} = useContext(UserContext);

	const loginUser = async (event) => {
		event.preventDefault();

		try{
			const {data} = await axios.post('/login',{
				email,
				password
			},{
				withCredentials:true
			});
			setUser(data);
			alert('Welcome Aboard!');
			setRedirect(true);//redirecting to home page on successfull login

		}catch (error){
			alert('There was some error during your login! Please try again later!');
		}

	}

	if(redirect){
		return <Navigate to={"/"} />//redirecting to home page in case of successful login
	}
	return (
		<div className="mt-4 grow flex items-center justify-around">

		<div className="mb-8">

		<h2 className="text-3xl text-center text-emerald-800 font-bold mb-4">Login</h2>

		<form action="" className="max-w-md mx-auto items-center" onSubmit={loginUser}>
			
			<input type="email" placeholder="email@email.com"
			 value={email} onChange = {event => setEmail(event.target.value)} />

			<input type="password" placeholder="Password"
			value={password} onChange = {event => setPassword(event.target.value)} />

			<button className="text-white p-2 w-full mt-2 rounded-full bg-primary">
			Go
			</button>
			<div className="text-center text-md text-gray-500 mt-1"> 
				Haven't Registered Yet? 
				<Link to={"/register"} className="text-red-500 font-medium">  Register Now</Link>
			</div>

			</form>
		</div>
		</div>

	

	)

}

export default Login;
