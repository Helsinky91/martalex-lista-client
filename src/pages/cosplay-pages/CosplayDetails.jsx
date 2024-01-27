import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCosplayDetailsService, chooseCosplayService, unChooseCosplayService } from "../../services/cosplay.services";
import PacmanLoader from "react-spinners/PacmanLoader";
import { getMyProfileService } from "../../services/profile.services";
import { AuthContext } from "../../context/auth.context"
import Error from '../Error';

function CosplayDetails() {

    const navigate = useNavigate();
    const { cosplayId } = useParams();
    const { user } = useContext(AuthContext)
    const [details, setDetails] = useState({});
    const [profile, setProfile] = useState({})
    const [error, setError] = useState(null);

    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        getData()

    }, []);

    const getData = async () => {

        try {
            const response = await getCosplayDetailsService(cosplayId)
            setDetails(response.data);
            // console.log("details: ", response.data)

            const profileResponse = await getMyProfileService(cosplayId)
            setProfile(profileResponse.data)
            // console.log("profile: ", profileResponse.data)
            setIsFetching(false);
        } catch (err) {
            console.error("Error choosing cosplay:", err);
            navigate("/error")
        }
    }


    //   to be able to choose a cosplay
    // const chooseCosplay = async () => {
    //     try {
    //        // Check if the cosplay has already been chosen
    //     if (details.choosedBy) {
    //         alert("Upss, you were too late. This cosplay has already been chosen.");
    //     } else {
    //         await chooseCosplayService(cosplayId);
    //         getData();
    //     }
    //     } catch (err) {
    //         console.error("Error choosing cosplay:", err);
    //         navigate("/error")
    //     }
    // }

    const chooseCosplay = async () => {
        try {
            const response = await chooseCosplayService(cosplayId);

            if (details.choosedBy) {
                // The cosplay has already been chosen
                alert("Upss, you were too late. This cosplay has already been chosen.");
            } else {
                // The cosplay has been chosen, update the state
                const updatedDetails = await getCosplayDetailsService(cosplayId);
                setDetails(updatedDetails.data);
            }
        } catch (err) {
            console.error("Error choosing cosplay:", err);
            // Display a custom error message
            // alert("An error occurred while choosing the cosplay. Please try again.");
            navigate("/choosed-cosplay");
        }
    }


    //to be able to unchoose a cosplay
    const unChooseCosplay = async () => {
        try {
            await unChooseCosplayService(cosplayId)
            getData()
        } catch (err) {
            console.error("Error unchoosing cosplay:", err);
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

    //if error pass the error status
    if (error) {
        return <Error status={error} />;
    }

    return (
        <div className="cosplay-details-page">
            <h1 className="details-name">{details.name}</h1>
            <br />
            <div className="cosplay-info">
                <div>
                    <img src={details.image} height="450" max-width="200" alt={details.name} />
                </div>
                <div className="cosplay-details">
                    {!details.nameDetails ? '' : <h4><u>Info adicional</u>: {details.nameDetails}</h4>}
                    <h4><u>Peli o serie</u>: {details.serie}</h4>
                    {/* {!details.serieDetails ? '' : <h5><u>Título alternativo</u>: {details.serieDetails}</h5> } */}
                    {!details.serieDetails ? '' : <h5>{details.serieDetails}</h5>}

                    <br />
                    {/* <ul className="cosplay-det-list">                     
                        {!details.descriptionCat ? '' : <li><a href={details.descriptionCat} target="_blank" rel="noopener noreferrer">Detalls del personatge (català) </a></li> }
                        <li><a href={details.descriptionEsp} target="_blank" rel="noopener noreferrer">Detalles del personaje (castellano) </a></li>
                        <li><a href={details.cosplayImage} target="_blank" rel="noopener noreferrer">Imagen del Cosplay</a></li>
                    </ul> */}

                    <section className="home-buttons">
                        {!details.descriptionCat ? '' : <button className="btn-yellow btn"><a href={details.descriptionCat} target="_blank" rel="noopener noreferrer">Detalls del personatge (CAT) </a></button>}
                        <button className="btn-yellow btn"><a href={details.descriptionEsp} target="_blank" rel="noopener noreferrer">Detalles del personaje (CAST) </a></button>
                    </section>

                    <button className="btn-yellow btn"><a href={details.youtubeLink} target="_blank" rel="noopener noreferrer">Buscar personaje en Youtube</a></button>
                    <br />
                    <br />

                    <section className="home-buttons">
                        <button className="btn-blue btn"><a href={details.cosplayImage} target="_blank" rel="noopener noreferrer">Ejemplos gente caracterizada</a></button>

                        <button className="btn-blue btn"><a href={details.aliExpressLink} target="_blank" rel="noopener noreferrer">Buscar Cosplay en Aliexpress o Etsy</a></button>
                    </section>
                    <br />

                    
                    {/* {profile.attendance[0] === 'No' || profile.attendance[0] === 'Quizás' ? (
                        <h5 className="red">⚠ Solo puede escoger cosplay quién asiste a la boda. <br />
                            Puedes cambiar tu asistencia editando tu perfil ⚠</h5>
                    ) : (
                        profile.cosplayId === details.cosplayId || details.choosedBy && details.choosedBy._id === profile._id ? (
                            <button className="choose-btn btn" onClick={unChooseCosplay}>Liberar Cosplay</button>
                        ) : (
                            profile.cosplayId ? (
                                <h5>⚠ Ya tienes un cosplay elegido ⚠</h5>
                            ) : (
                                !details.choosedBy ? (
                                    <button className="choose-btn btn" onClick={chooseCosplay}>Elegir Cosplay</button>
                                ) : <h4 className="red">¡Este cosplay ya ha sido elegido!</h4>
                            )
                        )
                    )} */}



                </div>
            </div>

        </div>
    )
};

export default CosplayDetails;