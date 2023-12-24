import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="error-page">
      <h2>Nuestros desarrolladores cometieron un error, estamos trabajando en ello!</h2>
      <Link to={"/"}>HOME</Link>
    </div>
  )
}

export default Error