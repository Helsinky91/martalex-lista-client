import React from 'react'
import { Link } from 'react-router-dom'

function Error({status}) {
  return (
    <div className="error-page">
       
          <h2>Hubo un error en el servidor, por favor inténtalo de nuevo más tarde.</h2>
          <button className="btn btn-yellow"><Link to={"/"}>VUELVE A LA PÁGINA DE INICIO</Link></button>
        
    </div>
)}

export default Error