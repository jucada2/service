import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src="/logo.png" alt="Streaming Service" />
          </Link>
          <div className="navbar-links">
            <Link to="/">Inicio</Link>
            <Link to="/favorites">Favoritos</Link>
            <Link to="/historial">Historial</Link>
          </div>
        </div>
        
        <div className="navbar-right">
          <div className="search-container">
            <input type="text" placeholder="Buscar..." />
          </div>
          
          <div className="profile-dropdown">
            <button 
              className="profile-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img src="/profile-avatar.png" alt="Profile" />
            </button>
            
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile">Mi Perfil</Link>
                <Link to="/favorites">Favoritos</Link>
                <Link to="/historial">Historial</Link>
                <button onClick={() => navigate('/login')}>Cerrar Sesión</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 