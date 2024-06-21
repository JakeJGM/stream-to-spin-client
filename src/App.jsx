import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import OurPicksPage from './pages/OurPicksPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="picks" element={<OurPicksPage/>} />
    </Routes>
  </Router>
  )
}

export default App
