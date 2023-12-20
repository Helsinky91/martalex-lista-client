import service from "./config.services";

const getCosplayListServices = () => {
    return service.get("/cosplay/cosplay-list");
    //this equals to http://localhost:5005/api + /cosplay/cosplay-list
}

const getCosplayDetailsService = (id) => {
    return service.get(`/cosplay/${id}/details`);
}

const getMyCosplayService = (id) => {
    return service.get(`/cosplay/${id}/choose-cosplay`);
}


export {
    getCosplayListServices,
    getCosplayDetailsService,
    getMyCosplayService
};