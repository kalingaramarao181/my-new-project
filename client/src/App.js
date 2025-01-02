import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Componets/home';
import Auth from './Componets/Auth';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth/>} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
