import React from 'react'
import { Link } from 'react-router-dom'

function Error({status}) {
  return (
    <div className="error-page">
       
          <h5>Hubo un error en el servidor, por favor inténtalo de nuevo más tarde.</h5>
          <Link to={"/"}>HOME</Link>
        
    </div>
)}

export default Error