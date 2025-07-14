import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

function Github() {
    // const [profile, setProfile] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         fetch('https://api.github.com/users/Abhi7552')
    //             .then(response => response.json())
    //             .then(data => {
    //                 setProfile(data);
    //                 console.log(data);
    //             })
    //     };

    //     fetchData();
    // }, []);  // better optimization is there

    const profile=useLoaderData();

  return (
    <div className='p-4 text-3xl bg-gray-500 text-white m-4 text-center'>
        Github followers : {profile ? profile.followers : 'Loading...'}
        <div>
            {profile && <img src={profile.avatar_url} alt="Github Profile Picture" style={{ margin: 'auto', borderRadius: '50%', width: '200px' }} />}
        </div>
    </div>
    
  )
}

export default Github;

export const githubLoader = async () => {
    const response = await fetch('https://api.github.com/users/Abhi7552');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
};