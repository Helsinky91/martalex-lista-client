
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
// import axios from 'axios'; 
import { Link,  useNavigate } from 'react-router-dom';
import FamilySearch from '../../components/FamilySearch';
import SearchCosplays from '../../components/SearchCosplay';
import { getCosplayListServices } from '../../services/cosplay.services';

 

function CosplayList(){

    //1. create a State that stores the data from the API
    const [list, setList] = useState([]);

    const [isFetching, setIsFetching] = useState(true);
    const navigate = useNavigate();

    //2. Call the API
    useEffect(() => {
        getData();
    }, []);

    // if (isFetching === true) {
    //     return <h3>...buscando</h3>    //! AQUI VA EL SPINNER
    // };

    

    const getData = async () => {
        try {
            const response = await getCosplayListServices()
            // console.log(response);
            setList(response.data);
            // setIsFetching(false);
        }catch(err) {
            navigate("/error")
        }
    } 

    return(
        <div>

            <SearchCosplays/>
            <FamilySearch/>

            <h4> Lista de todos los Cosplays</h4>

            {list.map((eachCosplay)=> {
                return (
                    <p key={eachCosplay._id}>
                        <img src={eachCosplay.image} width="100" alt={eachCosplay.name}/>
                        <br />
                        <Link to={`/cosplay/${eachCosplay._id}/details`}>{eachCosplay.name}</Link>
                        <hr />
                        {/* {eachCosplay.name}  </p> */}
                        </p>
                )
            })}



        </div>
    )
};

export default CosplayList;
