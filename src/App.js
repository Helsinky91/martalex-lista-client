import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>

          {/* public pages*/}
          <Route path='/' element={<Home />} />
      
      </Routes>

      <Footer />
    </div>
  );
}

export default App;