import React from "react";
import { Link } from 'react-router-dom'


function NotFound() {

    return (     
        <div className="not-found-page">
        
            {/* <h2>Page not found</h2> */}
            <Link to={"/"}>HOME</Link>

        </div>
    )

};

export default NotFound;