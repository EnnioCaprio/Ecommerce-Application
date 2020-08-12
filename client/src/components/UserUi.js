import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import UserSubInformation from '../components/UserSubInformation';

const UserUi = () => {
    const [user, dispatch] = useContext(UserContext);
    return(
        <div>
            <h1 className="profile-title">Profile</h1>
            {
                user.map(u => (
                    <UserSubInformation 
                        key={u._id}
                        text={u}
                    />
                ))
            }
        </div>
    )
}


export { UserUi as default }