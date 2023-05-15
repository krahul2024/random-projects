import React, {useState} from "react";
import { Link } from 'react-router-dom';
import styles from '../styles/username.module.css';


const Home=()=>{
	return ( <>

<div className="container mx-auto mt-20">
	<div className="flex justify-center items-center">
	 <div className={styles.glass}>

	 <div className="title flex flex-col items-center py-6">
	 	 <h1 className="text-4xl font-bold text-indigo-700">Search Trains</h1>
	 	 <span className="text-md text-cyan-700 italic mt-2">Train searching has never been this easier!</span>
	 </div>

	 <form action="" className="py-4" method="">

	 	<div className="title flex flex-col items-center mt-4 mb-6">
	 		<h2 className="text-xl font-bold text-cyan-700">By Station Name</h2>
	 		<input type="text" className={styles.text_box} name="boarding_station" placeholder=" Boarding Station"/>
	 		<input type="text" className={styles.text_box} name="destination_station" placeholder=" Destination Station"/>
	 	</div>
		
	 	<div className="title flex flex-col items-center mt-6 mb-4">
		<h2 className="text-xl font-bold text-cyan-700">By Train Number</h2>
		<input type="text" className={styles.text_box} name="train_number" placeholder=" Train Number"/>
		</div>

		<div className="title flex flex-col items-center mt-6 mb-4">
		<h2 className="text-xl font-bold text-cyan-700">By Train Name</h2>
		<input type="text" className={styles.text_box} name="train_name" placeholder=" Train Name"/>
		</div>

		<div className="title flex flex-col items-center">
		<h2 className="text-xl font-bold text-cyan-700 mb-4">By Date</h2>
		<input type="date" placeholder=" Journey Date" className={styles.text_box}/>
		</div>

		<div className="title flex flex-col items-center mt-4">
			<button className={styles.btn}>Search</button>
		</div>
		
	  </form>


		</div>
	</div>
</div>

  </>
)
}

export default Home;


