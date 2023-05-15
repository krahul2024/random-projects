import React from 'react';
import { Link } from 'react-router-dom'; //for using links instead of anchor tags
import profile_icon from '../images/profile_icon.png'; //this is for using the profile icon from here as this is just one time so we just import the image
import { Toaster } from 'react-hot-toast'; //this and formik are for displaying messages and stuff for more info search about it
import { useFormik } from 'formik';
import styles from '../styles/username.module.css';
import { passwordValidate } from '../helper/validate'



const Reset = () => {
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            console.log(values);
        }

    });

    return ( < >
        <div className="container mx-auto">
        {/*this is for displaying the error message in top center of the screen when submission happens*/}
        <Toaster position='top-center' reverseOrder={false}></Toaster>

              <div className="flex justify-center items-center h-screen">

              <div className={styles.glass}>

                <div className="title flex flex-col items-center">
                    
                <h3 className="text-3xl font-bold text-teal-700">Hope, You Remember This One!</h3>
                <span className="py-4 text w-2/3 text-center text-gray-400">Now, Enter Your New Password</span>
                </div>

                {/*to use formik error message display feature we have to mention this formik thing here or anywhere the form is present*/}
                <form action="" className="py-1 " onSubmit={formik.handleSubmit}> 

                    {/*this is for password field*/}
                    <div className="textbox justify-center ml-12 mt-14">
                    {/*as we have to display errors related to this particular field so we are using this formik statement in the username input field*/}
                    <input {...formik.getFieldProps('password')} className={styles.text_box } type="text" placeholder="New Password" />
                    <button className={styles.btn} type="submit">Log in</button>
                    </div>

                    <div className="text-center justify-center py-4 mt-2 mr-10">
                         <span className="text-gray-500 ml-0 text-md">Remember Old Password? 
                         <Link to="/password" className="text-orange-400 mr-4 ml-3 text-md">Log In</Link></span>
                    </div>

                </form>


              </div>
                
              </div>
                
            






            </div>

        < />
    )


}


export default Reset;