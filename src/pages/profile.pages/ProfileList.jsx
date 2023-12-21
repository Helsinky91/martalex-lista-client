import { getMyProfileService, getProfilesListService } from '../../services/profile.services';
import React, { useState, useEffect } from 'react';


function ProfileList() {
    const [profileList, setProfileList] = useState([]);
    const [myProfile, setMyProfile] = useState([])
    

    useEffect(() => {
    // Fetch the profile list when the component mounts
    const fetchData = async () => {
        try {
        const response = await getProfilesListService();
        setProfileList(response.data);
        const response2 = await getMyProfileService()
      setMyProfile(response2.data);
    console.log("response2.data " , response2.data)   
      

} catch (error) {
        console.error('Error fetching profile list:', error);
        }
    };

    fetchData();
    }, []);
    
    //if user === admin > Show cosplays and user info
        
        //if user === limited > Show user info + attendance + alergies ALSO
        //if user === limited && cosplay !== null > show "cosplay escogido"

        console.log("myProfile ", myProfile.role)
    return (
    <div>
        <h1>Profile List</h1>
        <ul>
        {profileList.map((user) => (
            <li key={user._id}>
            <p>Name: {user.name}</p>


                {myProfile.role === "admin" ? (
                    <div>
            <p>Cosplay Elegido:</p>
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
            </div>
            ) : (
                <p></p>
            )}

            {myProfile.role === "limited" ? (
                <div>
                
                <p>Alérgias: {user.alergies} </p>
                <p>Viene a la boda? {user.attendance} </p>
                </div>
                ) : (<p></p>
            )}

                        </li>
            
        ))}
        </ul>
    </div>
    );
}

export default ProfileList;