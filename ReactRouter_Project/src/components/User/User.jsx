import React from 'react'
import { useParams } from 'react-router-dom';

function User() {
    const {userId}=useParams();

  return (
    <div className='text-3xl bg-gray-700 text-white p-4 text-center'>User : {userId}</div>
  )
}

export default User;