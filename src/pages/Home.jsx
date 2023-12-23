import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Logo.png"
import Signup from './Signup';
import { AuthContext } from "../context/auth.context"


function Home() {

  const {isLoggedIn } = useContext(AuthContext);

    return (
        <div className="dashboard">
          <div className='app-logo'>
          <img src={logo} alt="MartAlex logo" width={400} />
          </div>
          <div className="dashboard">

          <div className="main-text">
          <h1 className="home-info">¡Nos Casamos!</h1>
          <p>Será el día <b>15 de Junio de 2024 </b>justo{' '} 
          <a href="https://martalex-ubicacion.netlify.app/" target="_blank" rel="noopener noreferrer">aquí</a>
          . Y la temática de la boda será...</p>
          <h1 className="cosplay-naming">C O S P L A Y</h1>
          <p>Tenemos muchas ganas! Os esperamos a todos con vuestra mejor caracterización.</p>
          <p><b>¿Respetad el protocolo!</b></p>
          
        </div>
        {!isLoggedIn ? (
          
          <div className="register-form">
            <Signup />
            </div>
        ):(<p></p>)}
        </div>
        </div>

    )
} 

export default Home;