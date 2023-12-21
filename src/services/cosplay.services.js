import service from "./config.services";

const getCosplayListServices = () => {
    return service.get("/cosplay/cosplay-list");
    //this equals to http://localhost:5005/api + /cosplay/cosplay-list
}

const getCosplayDetailsService = (cosplayId) => {
    return service.get(`/cosplay/${cosplayId}/details`);
}

const chooseCosplayService = (cosplayId) => {
    return service.patch(`/cosplay/${cosplayId}/choose-cosplay`);
}


export {
    getCosplayListServices,
    getCosplayDetailsService,
    chooseCosplayService
};