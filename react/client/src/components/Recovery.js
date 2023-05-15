import React from 'react';
import { Link } from 'react-router-dom'; //for using links instead of anchor tags
import profile_icon from '../images/profile_icon.png'; //this is for using the profile icon from here as this is just one time so we just import the image
import { Toaster } from 'react-hot-toast'; //this and formik are for displaying messages and stuff for more info search about it
import { useFormik } from 'formik';
import styles from '../styles/username.module.css';
import { passwordValidate } from '../helper/validate'



const Recovery = () => {
    return ( < >
        <div className="container mx-auto">

              <div className="flex justify-center items-center h-screen">

              <div className={styles.glass}>

                <div className="title flex flex-col items-center">
                    
                <h3 className="text-3xl font-bold text-emerald-700">Sad To Know This!</h3>
                <span className="py-4 text w-2/3 text-center text-gray-400">Anyways, Enter The OTP Sent To Your E-mail.</span>
                </div>

                <form action="" className="py-1 "> 

                    {/*this is for otp field*/}
                    <div className="textbox justify-center ml-12 mt-6 ">
                    <input className={styles.text_box } type="text" placeholder="OTP" />
                    <button className={styles.btn} type="submit">Reset Password</button>
                    </div>

                    <div className="text-center justify-center py-4">
                         <span className="text-gray-500 ml-4 text-md">Didn't Get OTP?
                         <Link to="/" className="text-orange-400 ml-4 text-md">Resend It</Link></span>
                    </div>

                </form>


              </div>
                
              </div>
                
            






            </div>

        <
        />
    )


}


export default Recovery;