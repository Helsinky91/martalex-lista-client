import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCosplayDetailsService, chooseCosplayService, unChooseCosplayService } from "../../services/cosplay.services";
import PacmanLoader from "react-spinners/PacmanLoader";
import { getProfileService } from "../../services/profile.services";
import { AuthContext } from "../../context/auth.context"

function CosplayDetails() {

    const navigate = useNavigate();
    const { cosplayId } = useParams();
    const { user } = useContext(AuthContext)
    const [ details, setDetails] = useState({});
    const [ profile, setProfile ] = useState({})
    
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {

        try {
            const response = await getCosplayDetailsService(cosplayId)
            setDetails(response.data);
            setIsFetching(false);
        } catch (err) {
            console.error("Error choosing cosplay:", err);
            navigate("/error")
        }
    }

    //to be able to choose a cosplay
    const chooseCosplay = async () => {
        try {
            await chooseCosplayService(cosplayId)
            getData()
        } catch (err) {
            navigate("/error")
        }
    }

    //to be able to unchoose a cosplay
    const unChooseCosplay = async () => {
        try {
            await unChooseCosplayService(cosplayId)
            getData()
        } catch (err) {
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

    return (
        <div>
            <h1>{details.name}</h1>
            <div className="cosplay-info">
                <div>
                    <img src={details.image} width="300" alt={details.name} />
                </div>
                <div>
                        {!details.nameDetails ? '' : <h2>Info adicional: {details.nameDetails}</h2> }
                        <h3>Peli o serie: {details.serie}</h3>
                        {!details.serieDetails ? '' : <h2>Título alternativo: {details.serieDetails}</h2> }
                        
                    <ul>                     
                        
                        {!details.descriptionCat ? '' : <li><a href={details.descriptionCat} target="_blank" rel="noopener noreferrer">Personatge (català) </a></li> }
                        <li><a href={details.descriptionEsp} target="_blank" rel="noopener noreferrer">Personatge (castellà) </a></li>
                        <li><a href={details.cosplayImage} target="_blank" rel="noopener noreferrer">Imagen del Cosplay</a></li>

                    </ul>
                    <button className="btn"><a href={details.youtubeLink} target="_blank" rel="noopener noreferrer">Buscar en Youtube</a></button>
                    <br />
                    <button className="btn"><a href={details.aliExpressLink} target="_blank" rel="noopener noreferrer">Buscar en Aliexpress</a></button>                   
                    <br />
                    <br />


                    {details.choosedBy  
                        ? <button className="choose-btn btn" onClick={unChooseCosplay}>Liberar Cosplay</button>
                        // ? <h1> Ya tienes cosplay!!</h1>
                        : <button className="choose-btn btn" onClick={chooseCosplay}>Elegir Cosplay</button>
                    }

                </div>
            </div>

        </div>
    )
};

export default CosplayDetails;