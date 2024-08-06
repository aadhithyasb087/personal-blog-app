import "./App.css";

import Home from "./pages/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Settings from "./components/settings/Settings";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import AddBlog from "./components/addblog/AddBlog";
import Blogs from "./components/blogs/Blogs";
import Draft from "./components/draft/Draft";
import EditBlog from "./components/blogs/EditBlog";
import DeleteBlog from "./components/blogs/DeleteBlog";
import ErrorPage from "./components/ErrorPage";
import { React, useEffect } from "react";
import { useUser } from "./contexts/UserContext";

function App() {
  const { saveUser } = useUser();
  const { user } = useUser();
    const navigate = useNavigate();


  useEffect(() => {
    const getUser = JSON.parse(sessionStorage.getItem("user"));

    if (getUser.displayName)
    {
      
      saveUser({ displayName: "Guest", email: "guest@gmail.com" });
      navigate("/");

    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/edit/:id" element={<EditBlog />} />
          <Route path="/blogs/delete/:id" element={<DeleteBlog />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/pending" element={<Draft />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
