import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import PostDetail from './pages/PostDetail';
import Login from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import Register  from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
