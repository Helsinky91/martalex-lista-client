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
        console.log(response.data)
        const response2 = await getMyProfileService()
      setMyProfile(response2.data);
    // console.log("response2.data " , response2.data)   
      

} catch (error) {
        console.error('Error fetching profile list:', error);
        }
    };

    fetchData();
    }, []);
    
       
    //if user === limited > Show user info + attendance + alergies ALSO
    //if user === limited && cosplay !== null > show "cosplay escogido"        
    return (
    <div>
        <h1>Lista Invitados</h1>
        <ul>
        {profileList.map((user) => (
            <li key={user._id}>
            <h4>{user.name}</h4>

                {myProfile.role === "admin" ? (
                <div>
                    <p>Cosplay Elegido:</p>
                    <ul>
                        {user.cosplayId.map((cosplay) => (
                            <li key={cosplay._id}>
                                {cosplay === undefined ? (
                                    <p>Ohhh not choosen yet... </p>
                                ) : (
                                    <div>
                                        <p>Name: {cosplay.name}</p>
                                        <p>{cosplay.image} width="300" alt={cosplay.name} </p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                ) : (<p></p>)}

                {myProfile.role === "limited" ? (
                <div>           
                    <p><b>Alérgias:</b> {user.alergies} </p>
                    <p><b>Viene a la boda?</b> {user.attendance} </p>
                    {user.cosplayId === undefined ? (<p><b>Ha elegido Cosplay? </b>Sí</p>): (<p><b>Ha elegido Cosplay?</b> No</p>)}
                </div>
                ) : (<p></p>)}

                <hr />
            </li>
       ))}
        </ul>
    </div>
    );
}

export default ProfileList;