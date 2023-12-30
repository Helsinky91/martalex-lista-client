import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from "../context/auth.context"
import homeLogo from "../assets/homeLogo.png"
import homeLogo2 from "../assets/HomeButto.png"


function Navbar() {
  const { authenticaUser, isLoggedIn } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    //invoke authenticaUser() to change states
    authenticaUser()
    // Navigate("/")
  }

  //function to invoke styles inside NavLink className
  const assignClassName = (navInfo) => {
    if (navInfo.isActive === true) {
      return "nav-active"
    } else {
      return "nav-inactive"
    }
  }

  return (
    <div className='navbar'>

      <div>
        <NavLink to="/">
          <img src={homeLogo2} alt="MartAlex logo" width={40} />
        </NavLink>
      </div>

      {isLoggedIn === true ? (


        <div>
          {/* <NavLink to="/" className={assignClassName}>
            <button >Home</button>
          </NavLink> */}
          <NavLink to="/cosplay/cosplay-list" className={assignClassName}>
            <button >Cosplays</button>
          </NavLink>
          {/* <NavLink to="/profile/list" className={assignClassName}>
            <button >ProfileList</button>
          </NavLink> */}
          

          <NavLink to="/profile/my-profile" className={assignClassName}>
            <button >Perfil</button>
          </NavLink>

          <span className="nav-logout">
            <button onClick={handleLogout}>Salir</button>
          </span>
        </div>

      ) : (

        <div>
          
          <NavLink to="/login" className={assignClassName}>
            <button >Entra</button>
          </NavLink>
        </div>
      )}

    </div>
  )
}

export default Navbar