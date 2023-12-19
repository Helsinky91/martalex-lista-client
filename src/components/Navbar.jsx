import { NavLink } from 'react-router-dom'

function Navbar() {

    return (
        <div>
            <div>
                <NavLink to="/"> HOME
                {/* <img src={logo} alt="whatcha cookin logo" width={50} /> */}
                </NavLink>
            </div>
        </div>
    )
};

export default Navbar;