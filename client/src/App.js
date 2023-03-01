import React from 'react';
import AuthSignUp from './pages/AuthSignUp';
import AuthLogIn from './pages/AuthLogIn';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

export default function App() {
  return (
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/signup' element={<AuthSignUp />} />
        <Route path='/login' element={<AuthLogIn />} />
      </Routes>

  );
}
