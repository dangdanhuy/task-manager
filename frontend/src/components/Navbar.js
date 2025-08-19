import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Task Manager</Link>
        <ul className="nav-links">
          {currentUser ? (
            <>
              <li><span>Welcome, {currentUser.username}</span></li>
              <li><button onClick={handleLogout} className="btn">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;