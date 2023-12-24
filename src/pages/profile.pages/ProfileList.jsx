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

            } catch (error) {
                console.error('Error fetching profile list:', error);
            }
        };

        fetchData();
    }, []);


    //if user === limited > Show user info + attendance + alergies ALSO
    //if user === limited && cosplay !== null > show "cosplay escogido"        
    return (
        <div className="profile-list">
            <h1>Lista Invitados</h1>
            <ul>
                {profileList.map((user) => (
                    <li key={user._id}>
                        <h4>{user.name}</h4>

                        {myProfile.role === "admin" ? (
                            <div>
                                {/* <p>Cosplay Elegido:</p> */}
                                {!user.cosplayId ? (<p>Ohhh not choosen yet... </p>) : (    //!How to do this? 
                                    <div>
                                        <ul>
                                            {user.cosplayId.map((cosplay) => (
                                                <li key={cosplay._id}>
                                                    <p>{cosplay.name}</p>
                                                    <img src={cosplay.image} width="150" alt={cosplay.name} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : ('')}

                        {myProfile.role === "limited" ? (
                            <div>
                                <p><b>Alérgias:</b> {user.alergies} </p>
                                <p><b>Viene a la boda?</b> {user.attendance} </p>
                                {user.cosplayId === undefined ? (<p><b>Ha elegido Cosplay? </b>Sí</p>) : (<p><b>Ha elegido Cosplay?</b> No</p>)}
                            </div>
                        ) : ('')}

                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfileList;