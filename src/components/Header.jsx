import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      navigate('/error'); 
    });
  };

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between items-center">
      <img className="w-60" src="Cineplex-GPT.png" alt="Logo" />

      {user && <div className='flex'>
        <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="User Avatar"/>
        <button onClick={handleSignOut} className='font-bold text-white cursor-pointer'>(Sign Out)</button>
      </div>}
    </div>
  )
}

export default Header
