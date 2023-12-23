import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import { getCosplayDetailsService, chooseCosplayService } from "../../services/cosplay.services";
import PacmanLoader from "react-spinners/PacmanLoader";


function CosplayDetails() {

    const navigate = useNavigate();
    const { cosplayId } = useParams();
    const [details, setDetails] = useState({});

    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {

        try {
            const response = await getCosplayDetailsService(cosplayId)
            setDetails(response.data);
            console.log("Cosplay detais: ", response.data)
            setIsFetching(false);
        } catch (err) {
            navigate("/error")
        }
    }

    //to be able to choose a cosplay
    const chooseCosplay = async () => {
        try {
            await chooseCosplayService(cosplayId)
            console.log("the cosplay has been added!", cosplayId)
            getData()
        } catch (err) {
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
            {/* <h4>Detalle del Cosplay</h4> */}
            <h1>{details.name}</h1>
            <div className="cosplay-info">
                <div>
                    <img src={details.image} width="300" alt={details.name} />
                </div>
                <div>
                            {!details.nameDetails ? '' : <h2>Info adicional: {details.nameDetails}</h2> }
                        <h3>{details.serie}</h3>
                        
                    <ul>
                        
                        
                        {!details.descriptionCat ? '' : <li><a href={details.descriptionCat} target="_blank" rel="noopener noreferrer">Detalls del cosplay (CAT) </a></li> }

                        <li><a href={details.descriptionEsp} target="_blank" rel="noopener noreferrer">Detalles del cosplay (ESP) </a></li>
                        <li><a href={details.cosplayImage} target="_blank" rel="noopener noreferrer">Cosplay Img</a></li>
                        

                    </ul>
                    <button className="btn"><a href={details.youtubeLink} target="_blank" rel="noopener noreferrer">Buscar en Youtube</a></button>
                    <br />
                    <button className="btn"><a href={details.aliExpressLink} target="_blank" rel="noopener noreferrer">Buscar en Aliexpress</a></button>

                    <br />
                    <br />




                    {/* {choosenBy.includes(userId)
              ? <button className="choose-btn" onClick={delChoosenCosplay}>Liberar Cosplay</button>
              
              : <button className="choose-btn" onClick={chooseCosplay}>Elegir Cosplay</button>
            } */}
                    {/* <button className="choose-btn" onClick={chooseCosplay}>Elegir Cosplay</button> */}
                </div>
            </div>

        </div>
    )


};

export default CosplayDetails;