// App.jsx
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AboutMe from './pages/AboutMe.jsx';
import Doorin from './pages/Doorin.jsx';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="navbar-spacer" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/doorin" element={<Doorin />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
