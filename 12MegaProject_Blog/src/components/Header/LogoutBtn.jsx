import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
// import { logout } from '../../appwrite/auth';

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout()
      .then(() => {
        dispatch(logout());
        // Optionally redirect to login page or show a message
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }

  return (
    <button className='inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-100'
    onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn;