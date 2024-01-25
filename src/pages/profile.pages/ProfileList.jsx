import SearchUser from '../../components/SearchUser';
import { getMyProfileService, getProfilesListService } from '../../services/profile.services';
import React, { useState, useEffect } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from 'react-router-dom';


function ProfileList() {
  const [profileList, setProfileList] = useState([]);
  const [myProfile, setMyProfile] = useState([])
  const [profileListToShow, setProfileListToShow] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSorted, setIsSorted] = useState(false); // Toggle state for sorting

  const [attendanceSiCounter, setAttendanceSiCounter] = useState(0);
  const [attendanceQuizasCounter, setAttendanceQuizasCounter] = useState(0);
  const [attendanceNoCounter, setAttendanceNoCounter] = useState(0);
  const [totalUsersCounter, setTotalUsersCounter] = useState(0);

  const [hasChoosenCosplay, setHasChoosenCosplay] = useState(0);
  const [hasntChoosenCosplay, setHasntChoosenCosplay] = useState(0);


  useEffect(() => {
    // Fetch the profile list when the component mounts
    const fetchData = async () => {
      try {
        const response = await getProfilesListService();
        setProfileList(response.data);

        const response2 = await getMyProfileService()
        setMyProfile(response2.data);
        setProfileListToShow(response.data);
        setIsFetching(false);

        const noAttendanceCount = response.data.filter(user => user.attendance[0] === "No").length;
        setAttendanceNoCounter(noAttendanceCount);

        const siAttendanceCount = response.data.filter(user => user.attendance[0] === "Sí").length;
        setAttendanceSiCounter(siAttendanceCount);

        const quizasAttendanceCount = response.data.filter(user => user.attendance[0] === "Quizás").length;
        setAttendanceQuizasCounter(quizasAttendanceCount);

        setTotalUsersCounter(response.data.length);

        const hasCosplay = response.data.filter(user => user.cosplayId !== null && user.cosplayId !== undefined && user.cosplayId?.length > 0).length;
        setHasChoosenCosplay(hasCosplay);

        const hasNotCosplay = response.data.filter(user => user.cosplayId === null || user.cosplayId === undefined || user.cosplayId?.length === 0).length;
        setHasntChoosenCosplay(hasNotCosplay);


      } catch (error) {
        console.error('Error fetching profile list:', error);
      }
    };

    fetchData();
  }, []);

  const filterList = (filterQuery) => {
    const filterArr = profileList.filter((eachEl) => {
      return (eachEl.name.includes(filterQuery)
        || eachEl.name.toLowerCase().includes(filterQuery)
        || eachEl.name.includes(filterQuery.toLowerCase())
      )
    })
    setProfileListToShow(filterArr)
  }

  const sortByCreationTime = () => {
    // Toggle between sorted and original order
    const sortedList = isSorted
      ? [...profileListToShow].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      : [...profileListToShow].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setProfileListToShow(sortedList);
    setIsSorted(!isSorted);
  };


  const sendEmailToAll = (userList) => {
    const emailAddresses = userList.map(user => user.email).join(',');
    window.location.href = `mailto:${emailAddresses}`;
  };


  //if content is not loading, show spinner
  if (isFetching === true) {
    return (
      <div className="spinner">
        <PacmanLoader color="#d68736" size={100} />
      </div>
    )
  }

  //if user === limited > Show user info + attendance + alergies ALSO
  //if user === limited && cosplay !== null > show "cosplay escogido"        
  return (
    <div className="profile-list">
      <h1>Llista Convidats</h1>
      <div className="cosplayFormCard">
        <SearchUser filterList={filterList} />
      </div>
      <div>
        <br />
        <button className="btn-yellow btn" onClick={sortByCreationTime}>{isSorted ? "Ordena per primer creat" : "Ordena per últim creat"}</button>
      </div>
      <br />

      {/* <div className="attendance-info ">
                <h5>Total Registrats: {totalUsersCounter}</h5>
                <hr />
                <h6>Assistència:</h6>
                    <p><b>Sí</b>: {attendanceSiCounter} p.</p>
                    <p ><b>Quizás</b>: {attendanceQuizasCounter} p.</p>
                    <p ><b>No</b>: {attendanceNoCounter} p.</p>
                    <hr />
                <h6>Han escollit cosplay?</h6>
                <p><b>Sí</b>: {hasChoosenCosplay} p.</p>
                <p ><b>No</b>: {hasntChoosenCosplay} p.</p>


            </div> */}

      <div className="attendance-info">
        <div className="total-users">
          <h5>Total Registrats:</h5>
          <p>{totalUsersCounter}</p>
        </div>

        <div className="data-tables">
          <table className="assistencia-table">
            <thead>
              <tr>
                <th colSpan="2">Assistència</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sí</td>
                <td>{attendanceSiCounter}</td>
              </tr>
              <tr>
                <td>Quizás</td>
                <td>{attendanceQuizasCounter}</td>
              </tr>
              <tr>
                <td>No</td>
                <td>{attendanceNoCounter}</td>
              </tr>
            </tbody>
          </table>

          <table className="cosplay-table">
            <thead>
              <tr>
                <th colSpan="2">Cosplay escollit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sí</td>
                <td>{hasChoosenCosplay}</td>
              </tr>
              <tr>
                <td>No</td>
                <td>{hasntChoosenCosplay}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>



      <br />
      {myProfile.role === "admin" && (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Ve a la boda?</th>
              <th>Cosplay Escollit</th>
            </tr>
          </thead>
          <tbody>
            {profileListToShow.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.attendance[0] === "Quizás" || user.attendance[0] === "No" ? (
                    <span className="red">{user.attendance}</span>
                  ) : (
                    <span>{user.attendance}</span>
                  )}
                </td>
                <td>
                  {user.cosplayId === undefined || user.cosplayId === null ? (
                    <p></p>
                  ) : (
                    <ul>
                      
                        <li key={user.cosplayId._id}>
                          <p>{user.cosplayId.name}</p>
                          <Link to={`/cosplay/${user.cosplayId._id}/details`}>
                            <img src={user.cosplayId.image} height="120" alt={user.cosplayId.name} />
                          </Link>
                        </li>
                      
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {myProfile.role === "limited" && (
        <div>
          {/* <button onClick={() => sendEmailToAll(profileListToShow)}>Send Email to All</button> */}

          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Alèrgies</th>
                <th>Ve a la boda</th>
                <th>Cosplay escollit</th>
              </tr>
            </thead>
            <tbody>
              {profileListToShow.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  {/* <td>{user.email}</td> */}
                  <td>
                    <a href={`mailto:${user.email}`} title={`Send email to ${user.email}`}>@</a>
                  </td>
                  <td>
                    {user.alergies === "No" || user.alergies === "no" || user.alergies === "ninguna" || user.alergies === "Ninguna" || user.alergies === "Ninguna " || user.alergies === "NO" || user.alergies === "Cap" ? (
                      <p>{user.alergies}</p>
                    ) : (
                      <p className="yellow">{user.alergies}</p>
                    )}
                  </td>
                  <td>
                    {user.attendance[0] === "No" ? (
                      <p className="red">{user.attendance}</p>
                    ) : user.attendance[0] === "Quizás" ? (
                      <p className="yellow">{user.attendance}</p>
                    ) : (
                      <p>{user.attendance}</p>
                    )}
                  </td>
                  <td>
                    {user.cosplayId !== null && user.cosplayId?.length > 0 ? (
                      <p>Sí</p>
                    ) : (
                      <p className="red">No</p>
                    )}
                  </td>

                </tr>

              ))}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProfileList;