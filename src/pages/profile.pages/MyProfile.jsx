import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PacmanLoader from "react-spinners/PacmanLoader";
import { getMyProfileService } from '../../services/profile.services';
// import { getCosplayDetailsService } from '../../services/cosplay.services';
import Error from '../Error';
import CountdownTimer from '../../components/CountdownTimer';
import CountdownTimerWithHour from '../../components/CountdownTimerWithHour';

import CountdownTimerCosplay from '../../components/CountdownTimerCosplay';


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
        <div>
          <Link to="/profile/list">
            <button className='btn-blue btn' >Llista convidats </button></Link>
          <br />
          <br />
          <Link to="/cosplay/cosplay-list-choosed">
            <button className='btn-red btn' >Cosplay escollits</button></Link>
        </div>
      ) : (<p></p>)}




      {/* <div><CountdownTimer /></div> */}
      <div><CountdownTimerWithHour /></div>


      <div className="my-profile" >
        <div className="">
          <h1>Hola {myProfile.name}! </h1>

          <div className="pers-inf-profile">
            <div className="pers-inf-segment">
              <span>Alergias:</span>
              <p>{myProfile.alergies}</p>
            </div>
            <div className="pers-inf-segment">
              <span>Vienes a la boda?</span>
              <p>{myProfile.attendance}</p>
            </div>
            <div className="pers-inf-segment">
              <span>Comida domingo:</span>
              <p>{myProfile.lunch}</p>
            </div>
          </div>
          {myProfile.attendance[0] === "No" || myProfile.attendance[0] === "Quizás" ? <p className='red'>(Solo podrás escoger cosplay si vienes a la boda!)</p> : null}
          <div className='btn'>
            <Link to={`/profile/${myProfile._id}/edit`}>
              <button className="btn-yellow btn">Edita tu perfil</button>
            </Link>
          </div>
          {/* <hr className="hr-profile" /> */}

          {/* <div><CountdownTimerCosplay /></div> */}

          {/* <hr className="hr-profile" /> */}
          <button className="btn btn-red"><a href="https://martalex-ubicacion.netlify.app/" >¿Dónde es el fiestón?</a></button> 
          {/* <br /> */}

          {myProfile.cosplayId === undefined || myProfile.cosplayId === null || myProfile.cosplayId.length <= 0 ? (
            <div>
              <br />

              <button className="btn-yellow btn"><Link to="/cosplay/cosplay-list">MIRA TODOS LOS COSPLAYS DISPONIBLES</Link></button>
              {/* <br />
              <br />
              <br /> */}
            </div>
          ) : (
            <div>
              <br />

              <div className="cosplay-profile-info">

                <Link to={`/cosplay/${myProfile.cosplayId._id}/details`}>
                  <h2>{myProfile.cosplayId.name}</h2>
                  <img src={myProfile.cosplayId.image} height={300} alt={myProfile.cosplayId.name} />
                  <p>Clica en la foto para obtener toda la info del cosplay</p>
                </Link>
                {/* <br />
                 <br />
                <br /> */}

              </div>
            </div>
          )}

          {/* CONFIG SOLO PARA JOSÉ BAGÜÉS Y SU 2NDO COSPLAY */}
          {/* {myProfile._id === "6591cc59633abf2a6f10c11f" ? (
            <div className="cosplay-profile-info">
              <Link to={`/cosplay/658d5faeb3be3973734c76e4/details`}>
                <h2>Ernesto de la Cruz</h2>
                <img src="https://i.pinimg.com/564x/93/2d/a3/932da31f9b2fc39f90621ef7b39442d1.jpg" height={300} alt="Ernesto de la Cruz" />
                <p>Clica en la foto para obtener toda la info del cosplay</p>
              </Link>
            </div>
          ) : (
            <p></p>
          )} */}


          {/* CONFIG SOLO PARA AFRI Y SU 2NDO COSPLAY */}
          {myProfile._id === "6584a6f30acecb6e3dbf23ed" ? (
            <div className="cosplay-profile-info">
              <Link to={`/cosplay/658d5faeb3be3973734c7713/details`}>
                <h2>Pétalo</h2>
                <img src="https://i.pinimg.com/564x/cc/01/67/cc01670c4bf709fd0744d4a47f4c3996.jpg" height={300} alt="Pétalo" />
                <p>Clica en la foto para obtener toda la info del cosplay</p>
              </Link>
            </div>
          ) : (
            <p></p>
          )}
         

          <hr className="hr-profile" />
          <h5 className="link">Subscríbete a nuestro <br /><button className="btn btn-green"><a href="https://whatsapp.com/channel/0029VaJH6Q635fLwxdDgfQ1l" >canal de Whatsapp</a></button> <br /> para recibir novedades y avisos.</h5>
          {/* <hr className="hr-profile" /> */}
          <br />
          <br />

        </div>

      </div>
    </div>
  )


};

export default MyProfile;