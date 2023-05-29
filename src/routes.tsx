import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from "./App";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import CreateBlogComponent from "./components/CreateBlogComponent";
import BlogDetailPage from "./pages/BlogDetailPage";

const routes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/auth/login" element={<LoginPage />} />
    <Route path="/auth/register" element={<RegisterPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/create" element={<CreateBlogComponent />} />
    <Route path="/blog/detail/:id" element={<BlogDetailPage />} />
  </Routes>
);

export default routes;