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
import ProfileDetails from './pages/profile.pages/ProfileDetails';
import NotFound from './pages/NotFound';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>

          {/* public pages*/}
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          {/* private pages*/}
          <Route path='/cosplay/cosplay-list' element={<IsPrivate><CosplayList /></IsPrivate>}/>
          {/* <Route path='/cosplay/cosplay-list' element={<CosplayList />}/> */}
          <Route path='/cosplay/:cosplayId/details' element={<IsPrivate><CosplayDetails /></IsPrivate>}/>
          <Route path='/profile/my-profile' element={<IsPrivate> <MyProfile /> </IsPrivate>} />

          {/* AQUÍ FALTA LIMITAR SI ADMIN USER? O VA EN LA RUTA DIRECTAMENTE? */}
          <Route path='/profile/list' element={<IsPrivate> <ProfileList /> </IsPrivate>} />
          <Route path='/profile/:userId/details' element={<IsPrivate> <ProfileDetails /> </IsPrivate>} />
          
          {/* errors page*/}
          <Route path='/error' element={<Error />} />
          <Route path='*' element={<NotFound />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;