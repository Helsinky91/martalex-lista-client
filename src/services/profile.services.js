import service from "./config.services";

//connects with BE profile.routes.js  

//for profile of logged user
const getMyProfileService = () => {
    return service.get("/profile/my-profile")
}

//for friend list
const getProfilesListService = () => {
    return service.get(`/profile/list`)
}

//for friend's profile
const getProfileService = (id) => {
    return service.get(`/profile/${id}/details`)
}

//edit profile
const editProfileService = (userId, profileChanges) => {
    return service.patch(`/profile/${userId}/edit`, profileChanges)
}


const attendanceProfileService = () => {
    return service.get("/profile/attendance")
}

const lunchProfileService = () => {
    return service.get("/profile/lunch")
}

// const updatePasswordService = (userId, newPassword) => {
//     return service.patch(`/profile/${userId}/password`, { password: newPassword });
//   };

export {
    getMyProfileService,
    getProfilesListService,
    getProfileService,
    editProfileService,
    attendanceProfileService,
    lunchProfileService
    // updatePasswordService
}