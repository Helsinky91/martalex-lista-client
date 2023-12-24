import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { signupService } from '../services/auth.services';

function Signup() {

  //config useNavigate()
  const navigate = useNavigate()

  //states to create newUser
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attendance, setAttendance] = useState(""); 
  const [alergies, setAlergies] = useState(""); 
  
  //to display the error message
  const [errorMessage, setErrorMessage] = useState("");

  //config to handle changes on the fields' form
  const handlenameChange = (e) => setname(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAttendanceChange = (e) => setAttendance(e.target.value); 
  const handleAlergiesChange = (e) => setAlergies(e.target.value);

  //config to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

    //get new user info
    const newUser = {
      name: name,
      email: email,
      password: password,
      attendance: attendance, 
      alergies: alergies,
    }

    try {
      //contact BackEnd to create the user (with the auth.service.js)
      await signupService(newUser)
      navigate("/login")
      
    } catch (err) {
      if (err.response && err.response.status === 400) {
        //if error is 400 stay in component and show error message
        setErrorMessage(err.response.data.errorMessage)
      } else {
        //if error 500 redirect to /error
        navigate('/error')
      }
    }
  };

  return (
    <div className="registr-form btn">

      <h1 className="home-info">Regístrate</h1>

      <form onSubmit={handleSignup}>

        <label>Nombre</label>
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={handlenameChange}
        />
        <br />

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
        <label>Asistencia: </label>
        
        <select value={attendance} onChange={handleAttendanceChange}>
          <option value="">Selecciona</option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>
        <br />

        <label>Alergias:</label>
        <br />
        <input
          type="text"
          name="alergies"
          value={alergies}
          onChange={handleAlergiesChange}
        />

        <br />
        <br />
        <button className="btn-yellow btn" type="submit">Regístrate</button>

        {errorMessage !== "" && <p>{errorMessage}</p>}

      </form>

    </div>
  );
}

export default Signup;