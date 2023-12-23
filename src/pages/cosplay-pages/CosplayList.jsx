
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
// import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import SerieFilter from '../../components/SerieFilter';
import SearchCosplay from '../../components/SearchCosplay';
import { getCosplayListServices } from '../../services/cosplay.services';
import PacmanLoader from "react-spinners/PacmanLoader";


function CosplayList() {

    const [list, setList] = useState([]);
    const [cosplayListToShow, setCosplayListToShow] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const navigate = useNavigate();

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
                || eachEl.serie.includes(filterQuery.toLowerCase())
                || eachEl.serieDetails.includes(filterQuery)
                || eachEl.serieDetails.toLowerCase().includes(filterQuery)
                || eachEl.serieDetails.includes(filterQuery.toLowerCase())
        )})
        setCosplayListToShow(filterArr)
    }

    const filterBySeries = (series) => {
        const filteredCosplays = list.filter(
          (cosplay) => cosplay.serie === series && cosplay.choosedBy === undefined
        );
        setCosplayListToShow(filteredCosplays);
        setSelectedSeries(series);
      };

      const showAllCosplays = () => {
        setCosplayListToShow(list);
        setSelectedSeries(null);
      };

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

<SerieFilter
      series={list.map((cosplay) => cosplay.serie)}
      onFilter={filterBySeries}
      onShowAll={showAllCosplays}
    />

            <h4> Lista de todos los Cosplays disponibles</h4>

            {/* Aquí fer la lògica segons list per .map i que si és cosplay.serie === "Harry Potter" ? (
                button amb background the la imagte i que llavors el filtri només amb aquell???
            ) */}
            {/* <div className="carrousel">  
                {list.map((cosplay) => {
                    if(cosplay.serie === "Star Wars" && cosplay.choosedBy === undefined) {
                       return (
                           <div key={cosplay._id} className="shadow-lg p-3 mb-5 bg-body rounded cosplayCard">
                            <Link to={`/cosplay/${cosplay._id}/details`}>
                            <button onClick={starWarsQuery}>Star Wars</button>
                                <img src={cosplay.image} alt={cosplay.name} width={200} />
                                <p>{cosplay.name}</p>
                                <p>{cosplay.nameDetails}</p>
                            </Link>
                            </div>
                       )         
                    }




                })}
            </div> */}


            <div class="cosplayBoxCard">
                {cosplayListToShow.map((eachCosplay) => {
                     if (eachCosplay.choosedBy === undefined) {
                    return (
                        <div key={eachCosplay._id} className="shadow-lg p-3 mb-5 bg-body rounded cosplayCard">
                            
                            <Link to={`/cosplay/${eachCosplay._id}/details`}>
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