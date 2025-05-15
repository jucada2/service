import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.scss"; // Estilos del header/navbar

function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        OWOWOWO
      </Link>
      <nav className="nav-links">
        <Link to="/">Inicio</Link>
        {userId && (
          <>
            <Link to="/favorites">Favoritos</Link>
            <Link to="/historial">Historial</Link>
            <Link to="/profile">Perfil</Link>
            <a href="#logout" onClick={handleLogout}>
              Cerrar sesión
            </a>
          </>
        )}
        {!userId && (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
