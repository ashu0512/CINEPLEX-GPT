import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate('/error'); 
    });
  };

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    const { uid, email, displayName, photoURL } = user;
    dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
    navigate('/browse');
  } else {
    dispatch(removeUser());
    navigate('/');
  }
});

  return () => unsubscribe();

  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between items-center">
      <img className="w-60" src={LOGO} alt="Logo" />

      {user && <div className='flex'>
        {showGptSearch &&<select className='py-2 px-4 mx-4 my-2 bg-gray-800 text-white rounded-lg cursor-pointer' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
          ))}
        </select>}
        <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg cursor-pointer' onClick={handleGptSearchClick}>{showGptSearch ? "Homepage" : "GPT Search"}</button>
        <img className="w-11 h-11 rounded-lg" src={user?.photoURL} alt="User Avatar"/>
        <button onClick={handleSignOut} className='font-bold text-white cursor-pointer'>(Sign Out)</button>
      </div>}
    </div>
  )
}

export default Header;
