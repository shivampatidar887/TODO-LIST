import React from 'react';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className='Header'>
      <div className='logo'>
        <h1>TODO LIST</h1>
      </div>
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <Link to='/me/update'>Profile</Link>
              <Link  onClick={handleLogout} to='/logout'>Logout</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to='/'>Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
