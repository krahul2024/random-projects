import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profile_icon from '../images/profile_icon.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import styles from '../styles/username.module.css';
import convertToBase64 from '../helper/convert';
import { validateProfile } from '../helper/validate';

const Profile = () => {

        const [file, setFile] = useState();

        const formik = useFormik({
            initialValues: {
                name: '',
                email: '',
                phone: ''
            },
            validate: validateProfile,
            validateOnBlur: false,
            validateOnChange: false,
            onSubmit: async values => {
                values = await Object.assign(values, { profile: file || '' });
                console.log(values);
            }
        });
        const onUpload = async event => {
            const base64 = await convertToBase64(event.target.files[0]);
            setFile(base64);
        }

        return ( < >

            <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-2/3 mt-40">
            	
            	<div className={styles.glass}>

            	<div className="title flex flex-col items-center py-2 py-4">
            	<h2 className="text-3xl font-bold text-emerald-700">Profile</h2>
            	<span className="text-md text-gray-400">Update your profile</span>
            	</div>

            	<form action="" className="py-1" onSubmit={formik.handleSubmit}>
            	{/*this div is for the image related stuff like upload the image*/}
            		<div className="profile flex justify-center items-center mb-2 mr-6">
            			<label htmlFor="profile">
            				<img className={styles.profile_image} src={file || profile_icon } alt="profile_icon"/>
            			</label>
            			<input onChange={onUpload} type="file" id="profile" name="profile" /> 
            		</div>
            	{/*this div is for the text and email inputs and other profile updates*/}
            		<div className="textbox justify-center ml-4 mt-6 ">
            		<input {...formik.getFieldProps('name')} type="text" name="name" placeholder="Name" className={styles.text_box,styles.register}/>
            		<input {...formik.getFieldProps('email')} type="text" name="email" placeholder="E-mail" className={styles.text_box,styles.register}/>
            		<input{...formik.getFieldProps('phone')} type="text" name="phone" placeholder="Phone" className={styles.text_box,styles.register}/>
            		<button className={styles.btn} style={{marginTop:'5'}}type="submit">Update</button>
            		</div>

            		{/*this is for when the user is already registered and wants to log in instead*/}
            		<div className="text-center justify-center py-2 mt-2 mr-10">
            			<span className="text-gray-600 text-sm">Wanna Get Out?</span>
            			<Link to="/" className="text-orange-500 ml-2 text-md">Log Out</Link>
            		</div>


            	</form>
            		


            	</div>



            </div>

        	</div>



            <
            />)
        }

        export default Profile;