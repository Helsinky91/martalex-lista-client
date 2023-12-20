import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PacmanLoader from "react-spinners/PacmanLoader";
import { getMyCosplayService, getMyProfileService } from '../../services/profile.services';


function MyProfile() {

    const navigate = useNavigate();

  //states
  const [profileList, setProfileList] = useState([])
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
      setProfileList(response.data);

        // const response2 = await getMyCosplayService()
        // setMyCosplay(response2.data);
        
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
          <h1>Hola {profileList.name}! </h1>
          <p>Alergias: {profileList.alergies}</p>
          <p>Vienes a la boda? {profileList.attendance}</p>

          {/* <div className='btn'>
            <Link to={`/profile/${profileList._id}/edit`}>
              <button>Edit your profile</button>
            </Link>
          </div> */}
        </div>

        </div>
        </div>
    )


};

export default MyProfile;