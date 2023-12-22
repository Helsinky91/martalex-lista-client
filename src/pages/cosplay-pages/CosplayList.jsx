
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
// import axios from 'axios'; 
import { Link,  useNavigate } from 'react-router-dom';
import FamilySearch from '../../components/FamilySearch';
import SearchCosplays from '../../components/SearchCosplay';
import { getCosplayListServices } from '../../services/cosplay.services';
import PacmanLoader from "react-spinners/PacmanLoader";


 

function CosplayList(){

    //1. create a State that stores the data from the API
    const [list, setList] = useState([]);

    const [isFetching, setIsFetching] = useState(true);
    const navigate = useNavigate();

    //2. Call the API
    useEffect(() => {
        getData();
    }, []);

    
    

    const getData = async () => {
        try {
            const response = await getCosplayListServices()
            // console.log(response);
            setList(response.data);
            setIsFetching(false);
        }catch(err) {
            navigate("/error")
        }
    } 

      //if content is not loading, show spinner
  if (isFetching === true) {
    return (
      <div className="spinner">
        <PacmanLoader color="#d68736" size={100} />
      </div>
    )
  }

    return(
        <div>

            {/* <SearchCosplays/>

            <FamilySearch/> */}
            {/* <div class="recipeFormCard">
          <SearchRecipe filterList={filterList} />
        </div> */}

            <h4> Lista de todos los Cosplays</h4>

         <div className="cosplayBoxCard">

            {list.map((eachCosplay)=> {
                if (eachCosplay.choosedBy === undefined) {

                    return (
                        <div key={eachCosplay._id} class="shadow-lg p-3 mb-5 bg-body rounded cosplayCard" >
                        <Link to={`/cosplay/${eachCosplay._id}/details`}><img src={eachCosplay.image} width="100" alt={eachCosplay.name}/></Link>
                        <br />
                        <Link to={`/cosplay/${eachCosplay._id}/details`}>{eachCosplay.name}</Link>
                        <p>{eachCosplay.nameDetails}</p>
                        {/* <hr className="hr-cosplay" /> */}
                        {/* {eachCosplay.name}  </p> */}
                        </div>
                    )
                 } return null
            })}
            </div>



        </div>
    )
};

export default CosplayList;
