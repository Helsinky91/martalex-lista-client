import SearchUser from '../../components/SearchUser';
import { getMyProfileService, getProfilesListService } from '../../services/profile.services';
import React, { useState, useEffect } from 'react';


function ProfileList() {
    const [profileList, setProfileList] = useState([]);
    const [myProfile, setMyProfile] = useState([])
    const [profileListToShow, setProfileListToShow] = useState([]);


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

    const filterList = (filterQuery) => {
        const filterArr = profileList.filter((eachEl) => {
            return (eachEl.name.includes(filterQuery)
                || eachEl.name.toLowerCase().includes(filterQuery)
                || eachEl.name.includes(filterQuery.toLowerCase())
                
            )
        })
        setProfileListToShow(filterArr)
    }



    //if user === limited > Show user info + attendance + alergies ALSO
    //if user === limited && cosplay !== null > show "cosplay escogido"        
    return (
        <div className="profile-list">
            <h1>Lista Invitados</h1>
            {/* <SearchUser filterList={filterList} /> */}
            <ul>
                {profileList.map((user) => (
                    <li key={user._id}>
                        <h4>{user.name}</h4>

                        {myProfile.role === "admin" ? (
                            <div>
                                {user.attendance[0] === "Quizás" || user.attendance[0] === "No" ? (<p className="red">Viene a la boda? {user.attendance}</p>) : (<p>Viene a la boda? {user.attendance} </p>) }
                                {/* <p>Cosplay Elegido:</p> */}
                                {user.cosplayId === undefined || user.cosplayId === null ? (<p>Ohhh not choosen yet... </p>) : (    //!How to do this? 
                                    <div>
                                        <ul>
                                            {user.cosplayId.map((cosplay) => (
                                                <li key={cosplay._id}>
                                                    <p>{cosplay.name}</p>
                                                    <img src={cosplay.image} height="250" alt={cosplay.name} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : ('')}

                        {myProfile.role === "limited" ? (
                            <div>
                                <p>{user.email}</p>
                                {/* <p className="color">Alérgias: {user.alergies} </p> */}
                                {user.alergies === "No" || user.alergies === "no" ||user.alergies === "ninguna" ? <p>Alergias: {user.alergies} </p> : <p className="color">Alérgias: {user.alergies} </p>}
                                {user.attendance[0] === "Quizás" || user.attendance[0] === "No" ? (<p className="red">Viene a la boda? {user.attendance}</p>) : (<p>Viene a la boda? {user.attendance} </p>) }
                                {/* {user.cosplayId !== "" ? (<p>Ha elegido Cosplay? Sí</p>) : (<p>Ha elegido Cosplay? No</p>)} */}
                                {user.cosplayId !== null && user.cosplayId?.length > 0 ? (<p>Ha elegido Cosplay? Sí</p> ) : (<p className="red">Ha elegido Cosplay? No</p>)}
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