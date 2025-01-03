import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Componets/home';
import Dashboard from './Componets/Dashboard';
import Login from './Componets/Auth';
import Cources from './Componets/Cources';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/cources" element={<Cources/>} />

        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
