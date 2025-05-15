import mysql.connector
import random
from faker import Faker

# Configuración de la conexión MySQL
conn = mysql.connector.connect(
    host="54.165.3.77",       # Cambia a tu host, por ejemplo "54.165.3.77" si usas remoto
    user="root",            # Tu usuario de MySQL
    password="tu_contraseña",
    database="user_db"      # Asegúrate que esta base de datos exista
)
cursor = conn.cursor()

fake = Faker('es_PE')
Faker.seed(123)

# Función para generar un nombre de usuario único
def generar_username():
    return fake.user_name()

# Función para asignar ciudad aleatoria de las opciones
def ciudad_realista():
    ciudades = ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura", "Cusco", "Huancayo", "Iquitos", "Puno", "Otras"]
    return random.choice(ciudades)

# Insertar usuarios
sql_user = "INSERT INTO users (username, email, edad, genero, ciudad) VALUES (%s, %s, %s, %s, %s)"
usuarios = []

# Generamos 20000 usuarios
for _ in range(20000):
    username = generar_username()
    email = f"{username.lower()}@gmail.com"
    edad = random.randint(18, 70)  # Edad entre 18 y 70 años
    genero = random.choice(["Masculino", "Femenino", "Otro"])  # Genero aleatorio
    ciudad = ciudad_realista()  # Ciudad aleatoria de las opciones
    usuarios.append((username, email, edad, genero, ciudad))

# Inserción de usuarios en bloques para mejorar performance
chunk_size = 1000
for i in range(0, len(usuarios), chunk_size):
    cursor.executemany(sql_user, usuarios[i:i+chunk_size])
    conn.commit()

# Ahora insertamos algunos favoritos (relacionando usuarios con videos)
sql_favorites = "INSERT INTO favorites (id, video_id) VALUES (%s, %s)"
favorites = []

# Generamos 50000 registros de favoritos (5 favoritos por usuario)
for user_id in range(1, 20001):  # Usuarios del 1 al 20000
    for _ in range(5):  # Cada usuario tendrá 5 videos favoritos
        video_id = random.randint(1, 1000)  # Simulamos IDs de videos entre 1 y 1000
        favorites.append((user_id, video_id))

# Inserción de favoritos en bloques
for i in range(0, len(favorites), chunk_size):
    cursor.executemany(sql_favorites, favorites[i:i+chunk_size])
    conn.commit()

print("¡Usuarios y favoritos insertados exitosamente!")

cursor.close()
conn.close()
