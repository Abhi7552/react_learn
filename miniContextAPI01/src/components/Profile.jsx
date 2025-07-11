
import { useContext } from 'react';
import UserContext from '../context/UserContext';

function Profile() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h2>Profile Page</h2>
            {user ? (
                <div>
                    <h2>Welcome {user.name} to your profile!</h2>
                    <h3>Have a Nice Day !</h3>
                </div>
            ) : (
                <p>No user logged in</p>
            )}

        </div>
    )
}

export default Profile;