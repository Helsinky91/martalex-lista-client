// import React, { useState, useEffect }from "react";
import { getProfilesListService } from '../../services/profile.services';

// In your functional component
import React, { useState, useEffect } from 'react';

function ProfileList() {
    const [profileList, setProfileList] = useState([]);

    useEffect(() => {
    // Fetch the profile list when the component mounts
    const fetchData = async () => {
        try {
        const response = await getProfilesListService();
        setProfileList(response.data);
        } catch (error) {
        console.error('Error fetching profile list:', error);
        }
    };

    fetchData();
    }, []);
    
    //if user === admin > Show cosplays and user info
        
        //if user === limited > Show user info + attendance + alergies ALSO
        //if user === limited && cosplay !== null > show "cosplay escogido"
    return (
    <div>
        <h1>Profile List</h1>
        <ul>
        {profileList.map((user) => (
            <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Chosen Cosplays:</p>
            <ul>
                {user.cosplayId.map((cosplay) => (
                <li key={cosplay._id}>
                    {/* Display cosplay details here */}
                    <p>Name: {cosplay.name}</p>
                    <p>Description: {cosplay.description}</p>
                    {/* Add more details as needed */}
                </li>
                ))}
            </ul>
            </li>
        ))}
        </ul>
    </div>
    );
}

export default ProfileList;