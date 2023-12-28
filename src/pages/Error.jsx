import React from 'react'
import { Link } from 'react-router-dom'

function Error({status}) {
  return (
    <div className="error-page">
       {status === 500 ? (
        <div>
          <h5>Hubo un error en el servidor, por favor inténtalo de nuevo más tarde.</h5>
          <Link to={"/"}>HOME</Link>
        </div>
        ) : (
        <div>
          <h5>Nuestros desarrolladores cometieron un error, estamos trabajando en ello!</h5>
          <Link to={"/"}>HOME</Link>
        </div>
        )
      }
  </div>
)}

export default Error