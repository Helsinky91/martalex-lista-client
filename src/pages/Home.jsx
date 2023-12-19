import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
          <div className='app-title'>
            <h1>MARTALEX WEB</h1>
          </div>

          <div className="main-text">
          <h1>NOS CASAMOSSSSSSSSSSSS</h1>
          <p>AQUÍ VA TEXTO MARTALEX
            <br />
            AQUI VA TEXTO PARA SIGNUP <Link to={"/signup"}>Sing up</Link> y create una cuenta!
          </p>
        </div>

        </div>

    )
} 

export default Home;