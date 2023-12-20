import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from 'react'; 
import { getCosplayDetailsService } from "../../services/cosplay.services";

function CosplayDetails() {

    const {cosplayId} = useParams();
    const [details, setDetails] = useState([]);

    const [isFetching, setIsFetching] = useState(true);
    
    
    // if (isFetching === true) {
    //     return <h3>...buscando</h3>    //! AQUI VA EL SPINNER
    // };

    useEffect(() => {
        getData()
    }, []);
    
    const getData = async () => {
        try{
            const response = await getCosplayDetailsService(cosplayId)
            // console.log("cosplayId", cosplayId)
            setDetails(response.data);
            // console.log("getData cosplayDetails", response.data)

            // setIsFetching(false);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <h4>Detalle del Cosplay</h4>
            <img src={details.image} width="300" alt={details.name}/>
            <h5>{details.name}</h5>
            <p>{details.description}</p>
            <p>Family: {details.family}</p>
        </div>
    )


};

export default CosplayDetails;