import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/auth.context";

import { getProfileService, editProfileService, attendanceProfileService, updatePasswordService } from '../../services/profile.services';
import PacmanLoader from "react-spinners/PacmanLoader";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';



function ProfileEdit() {
    const { authenticaUser } = useContext(AuthContext)

    const navigate = useNavigate()
    const { userId } = useParams()

    const [nameInput, setNameInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [attendanceInput, setAttendanceInput] = useState();
    const [allAttendance, setAllAttendance] = useState();
    const [alergiesInput, setAlergiesInput] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    const [isFetching, setIsFetching] = useState(true)




    //hanglechanges 
    const handleNameChange = (event) => setNameInput(event.target.value)
    const handleAttendanceChange = (event) => {
        let value = Array.from(event.target.selectedOptions, option => option.value)
        setAttendanceInput(value)
    }
    const handleEmailChange = (event) => setEmailInput(event.target.value)
    const handleAlergiesChange = (event) => setAlergiesInput(event.target.value)

    //calling the Api
    useEffect(() => {
        getData()
    }, []);

    const getData = async (event) => {

        try {
            //calling service that gets profile info by its Id from BE
            const response = await getProfileService(userId)

            //to set the actual value on the fields
            setNameInput(response.data.name)
            setAttendanceInput(response.data.attendance)
            setAlergiesInput(response.data.alergies)
            setEmailInput(response.data.email)

            //calling service to get utils/tag info from BE
            const attendanceData = await attendanceProfileService()
            setIsFetching(false)
            setAllAttendance(attendanceData.data)

        } catch (err) {
            navigate("/error")
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault()

        try {
            //to send new data to BE
            const updatedProfile = {
                name: nameInput,
                attendance: attendanceInput,
                email: emailInput,
                alergies: alergiesInput,
            }

            //calling service that updates all recipes details by Id to BE
            await editProfileService(userId, updatedProfile)

            //redirect
            navigate("/profile/my-profile")

        } catch (error) {
            if (error.response && error.response.status === 400) {
                //if error is 400 stay in component and show error
                setErrorMessage(error.response.data.errorMessage)
            } else {
                navigate("/error")
            }
        }
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
        <div className="profile-edit-page">
            {/* <div className="btn bottom-padding"> */}
            <div className="profile-form">
                <h2>Edita tu perfil</h2>

                <form onSubmit={handleUpdate}>

                    <label>Nombre y apellidos:</label>
                    <br />
                    <input type="text" name="name" value={nameInput} onChange={handleNameChange} />
                    <br />

                    <label>Email:</label>
                    <br />
                    <input type="email" name="email" value={emailInput} onChange={handleEmailChange} />
                    <br />
                    <br />

                    <label>Asistencia: </label>
                    <select name="attendance" value={attendanceInput} onChange={handleAttendanceChange}>
                        <option value="">Selecciona</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                        <option value="Quizás">Quizás</option>
                    </select>
                    <br />

                    <br />
                    <label>Alergias e intoleranias
                        <br /> alimentáreas:</label>
                    <br />
                    <input type="text" name="alergies" value={alergiesInput} onChange={handleAlergiesChange} />
                    <br />
                    <br />
                    <button className="btn-yellow btn" type="submit">Guarda los cambios</button>
                    {errorMessage !== "" && <p className='error-message'>{errorMessage}</p>}
                </form>
            </div>

        </div>
    )
}

export default ProfileEdit