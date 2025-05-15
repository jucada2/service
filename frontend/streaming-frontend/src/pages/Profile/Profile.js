import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService'; // Importa el servicio de usuario
import './Profile.scss';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    edad: '',
    genero: '',
    ciudad: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos del usuario desde la API usando el userService
    const fetchUserData = async () => {
      try {
        const response = await userService.getUserById(1); // 1 es el ID del usuario
        setUser(response.user);
        setFormData(response.user);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.updateUser(user.id, formData);
      if (response.message === "User updated successfully") {
        setUser(formData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      try {
        const response = await userService.deleteUser(user.id);
        if (response.message === "User deleted successfully") {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
      }
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Mi Perfil</h1>
          {!isEditing && (
            <button
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Nombre de Usuario</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Edad</label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Género</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
              >
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Ciudad</label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="save-button">
                Guardar Cambios
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setFormData(user);
                  setIsEditing(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-group">
              <label>Nombre de Usuario</label>
              <p>{user.username}</p>
            </div>
            <div className="info-group">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className="info-group">
              <label>Edad</label>
              <p>{user.edad} años</p>
            </div>
            <div className="info-group">
              <label>Género</label>
              <p>{user.genero}</p>
            </div>
            <div className="info-group">
              <label>Ciudad</label>
              <p>{user.ciudad}</p>
            </div>
          </div>
        )}

        <div className="danger-zone">
          <h2>Zona de Peligro</h2>
          <button
            className="delete-button"
            onClick={handleDeleteAccount}
          >
            Eliminar Cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
