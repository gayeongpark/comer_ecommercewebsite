import React from 'react';
import AuthSignUp from './pages/AuthSignUp';
import AuthLogIn from './pages/AuthLogIn';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<AuthSignUp />} />
      <Route path='/login' element={<AuthLogIn />} />
    </Routes>
  );
}
