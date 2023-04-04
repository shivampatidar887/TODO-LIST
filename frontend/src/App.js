import React, {useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Componants/Navbar';
import List from './Componants/List';
import LoginSignUp from './Componants/LoginSignup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from './actions/userActions';
import Addtask from './Componants/Addtask';
import Updatetask from './Componants/UpdateTask';
import UpdateProfile from './Componants/UpdateProfile';
function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('token');
  const token = jwt ? jwt : null;
  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch]);
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" theme="dark" />
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/home" element={<List />} />
        <Route path="/logout" element={<LoginSignUp />} />
        <Route path="/task/new" element={<Addtask />} />
        <Route path="/task/:id" element={<Updatetask />} />
        <Route path="/me/update" element={<UpdateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
