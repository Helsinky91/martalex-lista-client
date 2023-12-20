import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react'; 
import { getCosplayDetailsService, getMyCosplayService } from "../../services/cosplay.services";
import PacmanLoader from "react-spinners/PacmanLoader";

function CosplayDetails() {

    const navigate = useNavigate();
    const {cosplayId} = useParams();
    const [details, setDetails] = useState([]);

    const [isFetching, setIsFetching] = useState(true);
    
    useEffect(() => {
        getData()
    }, []);
    
    const getData = async () => {
        try{
            const response = await getCosplayDetailsService(cosplayId)
            // console.log("cosplayId", cosplayId)
            setDetails(response.data);
            // console.log("getData cosplayDetails", response.data)

            setIsFetching(false);
        } catch(err){
            navigate("/error")
        }
    }

    //to be able to choose a cosplay
    const chooseCosplay = async () => {
        try {
            await getMyCosplayService(cosplayId)
            getData()
        } catch(err){
            navigate("/error")
        }
    }

    //! FALTA UN-CHOOSE COSPLAY


  //if content is not loading, show spinner
  if (isFetching === true) {
    return (
      <div className="spinner">
        <PacmanLoader color="#d68736" size={100} />
      </div>
    )
  }


    return (
        <div>
            <h4>Detalle del Cosplay</h4>
            <img src={details.image} width="300" alt={details.name}/>
            <h5>{details.name}</h5>
            <p>{details.description}</p>
            <p>Family: {details.family}</p>


            {/* {choosenBy.includes(userId)
              ? <button onClick={delChoosenCosplay}>Liberar Cosplay</button>

              : <button onClick={chooseCosplay}>Elegir Cosplay</button>
            } */}
      <button onClick={chooseCosplay}>Elegir Cosplay</button>

        </div>
    )


};

export default CosplayDetails;