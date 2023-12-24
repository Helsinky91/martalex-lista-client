import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="error-page">
      <h5>Nuestros desarrolladores cometieron un error, estamos trabajando en ello!</h5>
      <Link to={"/"}>HOME</Link>
    </div>
  )
}

export default Error