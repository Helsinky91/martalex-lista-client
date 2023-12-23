
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
// import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import SerieFilter from '../../components/SerieFilter';
import SearchCosplay from '../../components/SearchCosplay';
import { getCosplayListServices } from '../../services/cosplay.services';
import PacmanLoader from "react-spinners/PacmanLoader";




function CosplayList() {

    //1. create a State that stores the data from the API
    const [list, setList] = useState([]);
    const [cosplayListToShow, setCosplayListToShow] = useState([]);
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
            setCosplayListToShow(response.data);
            setIsFetching(false);
        } catch (err) {
            navigate("/error")
        }
    }

    const filterList = (filterQuery) => {

        const filterArr = list.filter((eachEl) => {
            return (eachEl.name.includes(filterQuery)
                || eachEl.name.toLowerCase().includes(filterQuery)
                || eachEl.name.includes(filterQuery.toLowerCase())
                || eachEl.serie.includes(filterQuery)
                || eachEl.serie.toLowerCase().includes(filterQuery)
                || eachEl.serie.toUpperCase().includes(filterQuery)
                || eachEl.serie.includes(filterQuery.toLowerCase())
                || eachEl.serieDetails.includes(filterQuery)
                || eachEl.serieDetails.toLowerCase().includes(filterQuery)
                || eachEl.serieDetails.toUpperCase().includes(filterQuery)
                || eachEl.serieDetails.includes(filterQuery.toLowerCase()))

        })
        setCosplayListToShow(filterArr)
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

          


            <div className="cosplayFormCard">
                <SearchCosplay filterList={filterList} />
            </div>

            {/* <SerieFilter/> 
            To add as well a searcher for "ver todos"*/}

            <h4> Lista de todos los Cosplays disponibles</h4>


            <div class="cosplayBoxCard">
                {cosplayListToShow.map((eachCosplay) => {
                     if (eachCosplay.choosedBy === undefined) {
                    return (
                        <div key={eachCosplay._id} className="shadow-lg p-3 mb-5 bg-body rounded recipeCard">
                            
                            <Link to={`/recipes/${eachCosplay._id}/details`}>
                                <img src={eachCosplay.image} alt={eachCosplay.name} width={200} />
                                <p>{eachCosplay.name}</p>
                                <p>{eachCosplay.nameDetails}</p>
                            </Link>

                        </div>
                    )
                } return null
                })}
            </div>


        </div>
    )
};

export default CosplayList;
