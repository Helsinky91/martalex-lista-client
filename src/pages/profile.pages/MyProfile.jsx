import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PacmanLoader from "react-spinners/PacmanLoader";
import { getMyProfileService } from '../../services/profile.services';
// import { getCosplayDetailsService } from '../../services/cosplay.services';
import Error from '../Error';


function MyProfile() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //states
  const [myProfile, setMyProfile] = useState([])
  // const [myCosplay, setMyCosplay] = useState([])

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

  
    //if error pass the error status
    if (error) {
      return <Error status={error} />;
    }


  return (
    <div className='profile-page'>

      {myProfile.role === "admin" || myProfile.role === "limited" ? (
          <Link to="/profile/list">
          <button className='btn-blue btn' >Lista invitados </button></Link>
      ) : (<p></p>)}
      

      <div className="my-profile" >
        <div className="">
          <h1>Hola {myProfile.name}! </h1>
          <p>Alergias: {myProfile.alergies}</p>
          <p>Vienes a la boda? <b>{myProfile.attendance}</b></p>
      
        
          {myProfile.cosplayId === undefined || myProfile.cosplayId === null ? (
            <button className="btn-yellow btn"><Link to="/cosplay/cosplay-list">MIRA TODOS LOS COSPLAYS DISPONIBLES</Link></button>

          ) : (
            <div className="cosplay-profile-info">
              {myProfile.cosplayId.map((cosplay) => (  
                  <Link to={`/cosplay/${cosplay._id}/details`}>
                    <h2>{cosplay.name}</h2>
                    <img src={cosplay.image} height={300} alt={cosplay.name} />
                    <p>Clica en la foto para obtener toda la info del cosplay</p>
                  </Link>
              ))}
            </div>
          )}




          {/* <div className='btn'>
            <Link to={`/profile/${myProfile._id}/edit`}>
              <button className="btn">Edit your profile</button>
            </Link>
          </div> */}

        </div>

      </div>
    </div>
  )


};

export default MyProfile;