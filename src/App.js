import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CosplayList from './pages/cosplay-pages/CosplayList';


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>

          {/* public pages*/}
          <Route path='/' element={<Home />} />
          {/* <Route path='/' element={<CosplayList />}/> */}
      
      </Routes>

      <Footer />
    </div>
  );
}

export default App;