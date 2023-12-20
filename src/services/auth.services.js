import service from "./config.services";

//for POST "auth/signup"
const signupService = (newUser) => {
    return service.post("/auth/signup", newUser)
}

//for POST "auth/login"
const loginService = (userCredentials) => {
    return service.post('/auth/login', userCredentials)
}

// const loginService = async (userCredentials) => {
//     try {
//         const response = await service.post('/auth/login', userCredentials);
//         const authToken = response.data.authToken;
//         localStorage.setItem('authToken', authToken);
//         return response;
//     } catch (error) {
//         console.error("Login error:", error);
//         throw error;
//     }
// };


//for GET "auth/verify"
const verifyService = () => {
    // const token = localStorage.getItem("authToken")
    // console.log("verify Token:", token);
    return service.get('/auth/verify')
}

export {
    signupService,
    loginService,
    verifyService
}