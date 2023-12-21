import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PacmanLoader from "react-spinners/PacmanLoader";
import { getMyProfileService } from '../../services/profile.services';
import { getCosplayDetailsService } from '../../services/cosplay.services';


function MyProfile() {

  const navigate = useNavigate();

  //states
  const [myProfile, setMyProfile] = useState([])
  const [myCosplay, setMyCosplay] = useState([])

  //for loading time
  const [isFetching, setIsFetching] = useState(true)

  //calling the API
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
      //call my profile info 
      const response = await getMyProfileService()
      setMyProfile(response.data);
        console.log("getMyProfileService: ", response.data)
      
        if (response.data.cosplayId !== null){

            const response2 = await getCosplayDetailsService(response.data.cosplayId)
            setMyCosplay(response2.data);
            console.log("getCosplayDetailsService ", response2.data )
        } else {
            console.log("cosplay is undefined or empty")
        }
        
    // if (response.data.cosplayId) {
    //     const response2 = await chooseCosplayService(response.data.cosplayId);
    //     setMyCosplay(response2.data);
    // }

        setIsFetching(false)

    } catch (error) {
      navigate("/error")
    }
  }

    //if content is not loading, show spinner
  if (isFetching === true) {
    return (
      <div className="spinner">
        <PacmanLoader color="#d68736" size={100} />
      </div>
    )
  }


    return (
        <div>
            <div className="bottom-padding" >
        <div className="one-row">
          <h1>Hola {myProfile.name}! </h1>
          <p>Alergias: {myProfile.alergies}</p>
          <p>Vienes a la boda? {myProfile.attendance}</p>
                   
          {/* Display cosplay details here NOT SURE IF IT WORKS
                {myProfile.cosplayId.map((cosplay) => (
                <li key={cosplay._id}>
                    <p>Name: {cosplay.name}</p>
                    <p>Description: {cosplay.description}</p>
                    
                </li>
                ))} */}
          

          {/* <div className='btn'>
            <Link to={`/profile/${myProfile._id}/edit`}>
              <button>Edit your profile</button>
            </Link>
          </div> */}

        </div>

        </div>
        </div>
    )


};

export default MyProfile;