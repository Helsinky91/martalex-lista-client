import service from "./config.services";

const getCosplayListServices = () => {
    return service.get("/cosplay/cosplay-list");
    //this equals to http://localhost:5005/api + /cosplay/cosplay-list
}

const getCosplayDetailsService = (id) => {
    return service.get(`/cosplay/${id}/details`);
}

const chooseCosplayService = (cosplayId) => {
    return service.patch(`/cosplay/${cosplayId}/choose-cosplay`);
}

const unChooseCosplayService = (cosplayId) => {
    return service.patch(`/cosplay/${cosplayId}/unchoose-cosplay`);
}


export {
    getCosplayListServices,
    getCosplayDetailsService,
    chooseCosplayService,
    unChooseCosplayService
};