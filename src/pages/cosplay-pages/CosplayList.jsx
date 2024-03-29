import React, { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SerieFilter from '../../components/SerieFilter';
import SerieFilterCarousel from '../../components/SerieFilterCarousel';
import SearchCosplay from '../../components/SearchCosplay';
import { getCosplayListServices } from '../../services/cosplay.services';
import PacmanLoader from "react-spinners/PacmanLoader";
import Error from '../Error';

function CosplayList() {

    //Create a ref for the target section
    const cosplayBoxRef = useRef();

    const [list, setList] = useState([]);
    const [cosplayListToShow, setCosplayListToShow] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await getCosplayListServices()
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
            )
        })
        setCosplayListToShow(filterArr)
    }

    const filterBySeries = (series) => {
        const filteredCosplays = list.filter(
            (cosplay) => cosplay.serie === series && (cosplay.choosedBy === undefined || cosplay.choosedBy === null)
        );
        setCosplayListToShow(filteredCosplays);
        setSelectedSeries(series);
    };

    const showAllCosplays = () => {
        setCosplayListToShow(list);
        setSelectedSeries(null);
    };

    const getAvailableSeries = () => {
        const availableSeries = list.reduce((acc, cosplay) => {
            if (cosplay.choosedBy === undefined || cosplay.choosedBy === null) {
                // if (cosplay.choosedBy === undefined) {
                // console.log("choosedBy:", cosplay.choosedBy);
                acc.add(cosplay.serie);
            }
            return acc;
        }, new Set());
        return Array.from(availableSeries);
    };

    const scrollToCosplayBox = () => {
        cosplayBoxRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const filterBySeriesAndScroll = (series) => {
        filterBySeries(series);
        scrollToCosplayBox();
    };


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
        <div className="cosplay-list-page">
            {/* <div className="buscadores">

                <div className="cosplayFormCard">
                    <SearchCosplay filterList={filterList} />
                </div>
                <div>
                    <h2>Lista de Cosplays disponibles</h2>
                </div>
                <div>
                    <button className="btn btn-blue" onClick={showAllCosplays}>Ver todos los Cosplays</button>
                </div>
            </div> */}
            <div>
                <h2>Lista de Cosplays disponibles</h2>
            </div>
            <br />
            <div>
                <button className="btn btn-blue" onClick={showAllCosplays}>Ver todos los Cosplays</button>
            </div>
            <br />
            <div className="carrousel">

                <SerieFilterCarousel
                    series={getAvailableSeries()}
                    onFilter={filterBySeries}
                />
            </div>
            <br />
            <div className="cosplayFormCard">
                <SearchCosplay filterList={filterList} />
            </div>

            <div className="cosplayBoxCard" ref={cosplayBoxRef}>
                {cosplayListToShow.map((eachCosplay) => {
                    if (eachCosplay.choosedBy === undefined || eachCosplay.choosedBy === null) {
                        return (
                            <div key={eachCosplay._id} className="shadow-lg p-3 mb-5 bg-body rounded cosplayCard">

                                <Link to={`/cosplay/${eachCosplay._id}/details`}>
                                    <img src={eachCosplay.image} alt={eachCosplay.name} height={300} />
                                    <p>{eachCosplay.name}</p>
                                    <p>{eachCosplay.nameDetails}</p>
                                </Link>

                            </div>
                        )
                    } return null
                })}
            </div>
            <div>
                <SerieFilter
                    // series={list.map((cosplay) => cosplay.serie)}
                    series={getAvailableSeries()}
                    onFilter={filterBySeriesAndScroll}

                />
            </div>
        </div>
    )
};

export default CosplayList;