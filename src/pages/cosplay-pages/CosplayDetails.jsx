import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from 'react'; 
import { getCosplayDetailsService, chooseCosplayService } from "../../services/cosplay.services";
import PacmanLoader from "react-spinners/PacmanLoader";


function CosplayDetails() {

    const navigate = useNavigate();
    const {cosplayId} = useParams();
    const [details, setDetails] = useState({});

    const [isFetching, setIsFetching] = useState(true);
    
    useEffect(() => {
        getData()
    }, []);
    
    const getData = async () => {
       
        try{
            const response = await getCosplayDetailsService(cosplayId)
            setDetails(response.data);
            console.log("response" ,response.data)
            setIsFetching(false);
        } catch(err){
            navigate("/error")
        }
    }

    //to be able to choose a cosplay
    const chooseCosplay = async () => {
        try {
            await chooseCosplayService(cosplayId)
            console.log("the cosplay has been added!", cosplayId)
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
            <h1>{details.name}</h1>
            <img src={details.image} width="300" alt={details.name}/>
                <ul>
                    <li><Link to="{details.descriptionCat}">Detalls del cosplay (CAT) </Link></li>
                    <li><Link to="{details.descriptionEsp}">Detalles del cosplay (ESP) </Link></li>
                    <li><Link to="{details.cosplayLink}">Cosplay Img</Link></li>

                </ul>
                <button><Link to="{details.youtubeLink}">Buscar en Youtube</Link></button>
                <button><Link to="{details.aliExpressLink}">Buscar en Aliexpress</Link></button>

            <br/>
            <br/>
                        
                        {/* <p>Family: {details.family}</p> */}


            {/* {choosenBy.includes(userId)
              ? <button className="choose-btn" onClick={delChoosenCosplay}>Liberar Cosplay</button>

              : <button className="choose-btn" onClick={chooseCosplay}>Elegir Cosplay</button>
            } */}
      <button className="choose-btn" onClick={chooseCosplay}>Elegir Cosplay</button>

        </div>
    )


};

export default CosplayDetails;