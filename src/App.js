import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importing Pages
import Home from './User/Pages/Home/Home'

// Import Job Pages
import Jobs from "./User/Pages/Jobs/Jobs";
import JobDetails from "./User/Pages/Jobs/JobDetails/JobDetails"

// Blogs Imports
import Blogs from "./User/Pages/Blogs/Blogs";
import BlogDetails from "./User/Pages/Blogs/BlogDetails/BlogDetails";
import BlogAuthor from "./User/Pages/Blogs/BlogAuthor/BlogAuthor";

import Contact from "./User/Pages/Contact/Contact";

// Import Auth Pages
import Error404 from "./User/Pages/Auth/Error404";
import ResetPassword from "./User/Pages/Auth/ResetPassword";
import SignOut from "./User/Pages/Auth/SignOut";
import SignUp from "./User/Pages/Auth/SignUp";
import SignIn from "./User/Pages/Auth/SignIn";


import "./assets/scss/themes.scss";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/jobs" element={<Jobs/>}></Route>
        <Route path="/jobdetails" element={<JobDetails/>}></Route>

        {/* Blogs Routes  */}
        <Route path="/blogs" element={<Blogs/>}></Route>
        <Route path="blogdetails" element={<BlogDetails/>}></Route>
        <Route path="blogauthor" element={<BlogAuthor/>}></Route>

        <Route path="/contact" element={<Contact/>}></Route>

        {/* Auth Routes */}
        <Route path="*" element={<Error404/>}></Route>
        <Route path="/resetpassword" element={<ResetPassword/>}></Route>
        <Route path="/signout" element={<SignOut/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
      </Routes>
    </Router>
  );
} 

export default App;