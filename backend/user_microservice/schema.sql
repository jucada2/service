-- Crear la base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS user_db;

-- Usar la base de datos creada
USE user_db;

-- Crear la tabla 'users'
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100),
    edad INT,
    genero VARCHAR(10),
    ciudad VARCHAR(100),
    password VARCHAR(255) 
);

-- Crear la tabla 'favorites'
CREATE TABLE IF NOT EXISTS favorites (
    id INT,
    video_id INT,
    PRIMARY KEY (id, video_id),
    FOREIGN KEY (id) REFERENCES users(id)
);
