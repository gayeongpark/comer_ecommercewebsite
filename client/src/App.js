import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthSignUp from './pages/AuthSignUp';
import AuthLogIn from './pages/AuthLogIn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Product from './pages/Product';
import Posting from './pages/Posting';

export default function App() {
  return (
    <Routes>
      <Route index path='/' element={<Home />} />
      <Route path='/signup' element={<AuthSignUp />} />
      <Route path='/login' element={<AuthLogIn />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/product' element={<Product />} />
      <Route path='/posting' element={<Posting />} />
    </Routes>
  );
}
