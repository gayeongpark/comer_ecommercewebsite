import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthSignUp from './pages/AuthSignUp';
import AuthLogIn from './pages/AuthLogIn';
import Home from './pages/Home';
import Product from './pages/Product';
import Posting from './pages/Posting';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import MyProfile from './pages/MyProfile';
import Hosting from './pages/HostingExperience';
import VertifiecEmail from './pages/VertifiecEmail';
// import ProfileSK from './components/Profile/ProfileSK';

export default function App() {
  return (
    <Routes>
      <Route index path='/' element={<Home />} />
      <Route path='/signup' element={<AuthSignUp />} />
      <Route path='/yourProfile/:id' element={<MyProfile />} />
      <Route path='/login' element={<AuthLogIn />} />
      <Route path='/forgotPassword' element={<ForgotPassword />} />
      <Route path='/resetPassword/:token' element={<ResetPassword />} />
      <Route path='/emailVerification/:token' element={<VertifiecEmail />} />
      <Route path='/hostingExperience/:id' element={<Hosting />} />
      <Route path='/product' element={<Product />} />
      <Route path='/posting' element={<Posting />} />
    </Routes>
  );
}
