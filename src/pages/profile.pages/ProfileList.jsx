import SearchUser from '../../components/SearchUser';
import { getMyProfileService, getProfilesListService } from '../../services/profile.services';
import React, { useState, useEffect } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";


function ProfileList() {
    const [profileList, setProfileList] = useState([]);
    const [myProfile, setMyProfile] = useState([])
    const [profileListToShow, setProfileListToShow] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isSorted, setIsSorted] = useState(false); // Toggle state for sorting

    const [attendanceSiCounter, setAttendanceSiCounter] = useState(0);
    const [attendanceQuizasCounter, setAttendanceQuizasCounter] = useState(0);
    const [attendanceNoCounter, setAttendanceNoCounter] = useState(0);
    const [totalUsersCounter, setTotalUsersCounter] = useState(0);

    const [hasChoosenCosplay, setHasChoosenCosplay] = useState(0);
    const [hasntChoosenCosplay, setHasntChoosenCosplay] = useState(0);


    useEffect(() => {
        // Fetch the profile list when the component mounts
        const fetchData = async () => {
            try {
                const response = await getProfilesListService();
                setProfileList(response.data);

                const response2 = await getMyProfileService()
                setMyProfile(response2.data);
                setProfileListToShow(response.data);
                setIsFetching(false);

                const noAttendanceCount = response.data.filter(user => user.attendance[0] === "No").length;
                setAttendanceNoCounter(noAttendanceCount);

                const siAttendanceCount = response.data.filter(user => user.attendance[0] === "Sí").length;
                setAttendanceSiCounter(siAttendanceCount);

                const quizasAttendanceCount = response.data.filter(user => user.attendance[0] === "Quizás").length;
                setAttendanceQuizasCounter(quizasAttendanceCount);

                setTotalUsersCounter(response.data.length);

                const hasCosplay = response.data.filter(user => user.cosplayId !== null && user.cosplayId !==undefined && user.cosplayId?.length > 0).length;
                setHasChoosenCosplay(hasCosplay);

                const hasNotCosplay = response.data.filter(user => user.cosplayId === null || user.cosplayId === undefined || user.cosplayId?.length === 0).length;
                setHasntChoosenCosplay(hasNotCosplay);


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
      
    const sortByCreationTime = () => {
        // Toggle between sorted and original order
        const sortedList = isSorted
            ? [...profileListToShow].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            : [...profileListToShow].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setProfileListToShow(sortedList);
        setIsSorted(!isSorted);
    };

    //if content is not loading, show spinner
    if (isFetching === true) {
        return (
            <div className="spinner">
                <PacmanLoader color="#d68736" size={100} />
            </div>
        )
    }

    //if user === limited > Show user info + attendance + alergies ALSO
    //if user === limited && cosplay !== null > show "cosplay escogido"        
    return (
        <div className="profile-list">
            <h1>Llista Convidats</h1>
            <div className="cosplayFormCard">
               <SearchUser filterList={filterList} />    
            </div>
            <div>
                <br />
                <button className="btn-yellow btn" onClick={sortByCreationTime}>{isSorted ? "Ordena per primer creat" : "Ordena per últim creat"}</button>            </div>
            <br />
            <div className="attendance-info ">
            <h5>Total Registrats: {totalUsersCounter}</h5>
            <hr />
            <h6>Assistència:</h6>
                <p><b>Sí</b>: {attendanceSiCounter} p.</p>
                <p ><b>Quizás</b>: {attendanceQuizasCounter} p.</p>
                <p ><b>No</b>: {attendanceNoCounter} p.</p>
                <hr />
            <h6>Han escollit cosplay?</h6>
            <p><b>Sí</b>: {hasChoosenCosplay} p.</p>
            <p ><b>No</b>: {hasntChoosenCosplay} p.</p>


            </div>
            <br />
            <ul>
                {profileListToShow.map((user) => (
                    <li key={user._id}>
                        <h4>{user.name}</h4>

                        {myProfile.role === "admin" ? (
                            <div>
                                {user.attendance[0] === "Quizás" || user.attendance[0] === "No" ? (<p className="red">Viene a la boda? {user.attendance}</p>) : (<p>Viene a la boda? {user.attendance} </p>) }
                                {/* <p>Cosplay Elegido:</p> */}
                                {user.cosplayId === undefined || user.cosplayId === null ? (<p></p>) : (    
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
                                {user.alergies === "No" || user.alergies === "no" || user.alergies === "ninguna" || user.alergies === "Ninguna" ? <p>Alergias: {user.alergies} </p> : <p className="color">Alérgias: {user.alergies} </p>}
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