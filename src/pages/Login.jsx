import React, { useContext } from 'react'
import { useState } from "react";
import { loginService } from '../services/auth.services';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Error from "./Error";

function Login() {

  const [error, setError] = useState(null);
  //config el uso de authenticaUser 
  const { authenticaUser } = useContext(AuthContext)

  //config el uso de navigate
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


  
  const handleLogin = async (e) => {
    e.preventDefault();

    //get user's credentials
    const userCredentials = {
      email: email,
      password: password
    }

    try {
      //validate with BE with auth.services.js
      const response = await loginService(userCredentials)

      //get the Token and store it in "authToken"
      localStorage.setItem("authToken", response.data.authToken)
      
      //invoke Token validation (in auth.context)
      await authenticaUser()
      
      //redirect user
      navigate("/profile/my-profile")
      // navigate("/cosplay/cosplay-list")
      



    } catch (err) {
      if (err.response && err.response.status === 400) {
        //if error is 400 stay in component and show error message
        setErrorMessage(err.response.data.errorMessage)
      } else {
        //if error 500 redirect to /error
        navigate('/error')
      }
    }
  }

  
    //if error pass the error status
    if (error) {
      return <Error status={error} />;
    }
 

  return (
    <div className="login-page">
    <div className="auth-page" >
      
      <h1>Entra</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label>Contraseña:</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <br />
        <button className="btn-red btn" type="submit">Entra</button>
        {errorMessage !== "" && <p className='error-message'>{errorMessage}</p>}


      </form>

    </div>
    </div>
  );
}

export default Login;