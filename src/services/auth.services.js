import service from "./config.services";

//for POST "auth/signup"
const signupService = (newUser) => {
    return service.post("/auth/signup", newUser)
}

//for POST "auth/login"
const loginService = (userCredentials) => {
    return service.post('/auth/login', userCredentials)
}


//for GET "auth/verify"
const verifyService = () => {
    return service.get('/auth/verify')
}

// // for POST "auth/forgot-password"
// const forgotPasswordService = (email) => {
//     return service.post('/auth/forgot-password', { email });
//   };
  
//   // for POST "auth/reset-password"
//   const resetPasswordService = (token, newPassword) => {
//     return service.post(`/auth/reset-password/${token}`, { newPassword });
//   };



export {
    signupService,
    loginService,
    verifyService,
    // forgotPasswordService, 
    // resetPasswordService, 
}