import React from 'react'
import Header from './Header'
import { useState, useRef } from 'react';
import { validateSignIn, validateSignUp } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
const [isSignInForm, setIsSignInForm] = useState(true);
const [errorMessage, setErrorMessage] = useState(null);
const dispatch = useDispatch();
const fullName = useRef(null);
const email = useRef(null);
const password = useRef(null);

const handleButtonClick = () => {
    const message = isSignInForm ? validateSignIn(email.current.value, password.current.value) : validateSignUp(fullName.current.value, email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    
    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
       const user = userCredential.user;
       updateProfile(user, {
        displayName: fullName.current.value,
        photoURL: USER_AVATAR,
       })
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
       })
        .catch((error) => {
        setErrorMessage(error.message);
       });
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
  });
    }
    else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    }
}

const toggleSignInForm = () => {
  setIsSignInForm(!isSignInForm);
}
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img className='w-screen' src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1280,h_720,q_75,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs" alt="background" />
      </div>
          <form onSubmit={(e)=>e.preventDefault()} className='w-90 absolute p-12 bg-black m-36 mx-auto right-0 left-0 text-white opacity-80 rounded-lg'>
          <h1 className='text-3xl mb-4 font-bold'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>

          {!isSignInForm &&<input type="text" placeholder="Full Name" ref={fullName} 
           className='p-3 my-3 border border-gray-600 w-full' />}

           <input type="email" placeholder="Email Address" ref={email} 
           className='p-3 my-3 border border-gray-600 w-full' />

           <input type="password" placeholder="Password" ref={password}
           className='p-3 my-3 border border-gray-600 w-full' />

           <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>

           <button className='p-3 my-3 bg-red-600 hover:bg-red-700 text-xl w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
           <p className='text-center my-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Cineplex? Sign Up Now" : "Already Registered? Sign In Now"}</p>
        </form>
      </div>
  )
}

export default Login
