import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CosplayList from './pages/cosplay-pages/CosplayList';
import CosplayDetails from './pages/cosplay-pages/CosplayDetails';
import Signup from './pages/Signup';
import Login from './pages/Login';

import IsPrivate from './components/IsPrivate';
import ProfileList from './pages/profile.pages/ProfileList';
import MyProfile from './pages/profile.pages/MyProfile';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import ProfileEdit from './pages/profile.pages/ProfileEdit';
import ChoosedCosplay from './pages/cosplay-pages/ChoosedCosplay';
import CosplayListChoosed from './pages/cosplay-pages/CosplayListChoosed';
// import ResetPassword from './pages/ResetPassword';
// import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>

          {/* public pages*/}
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}

          {/* private pages*/}
          <Route path='/cosplay/cosplay-list' element={<IsPrivate><CosplayList /></IsPrivate>}/>
          <Route path='/cosplay/cosplay-list-choosed' element={<IsPrivate><CosplayListChoosed /></IsPrivate>}/>

          <Route path='/cosplay/:cosplayId/details' element={<IsPrivate><CosplayDetails /></IsPrivate>}/>
          <Route path='/profile/my-profile' element={<IsPrivate> <MyProfile /> </IsPrivate>} />
          <Route path='/profile/list' element={<IsPrivate> <ProfileList /> </IsPrivate>} />
          <Route path='/profile/:userId/edit' element={<IsPrivate> <ProfileEdit /> </IsPrivate>} />
        
          
          {/* errors page*/}
          <Route path='/error' element={<Error />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/choosed-cosplay' element={<ChoosedCosplay />} />


      </Routes>

      {/* <Footer /> */}
    </div>
  );
}

export default App;