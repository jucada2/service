from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import mysql.connector

# Configuración de la base de datos
host_name = "172.31.95.13"  
port_number = 3306
user_name = "user"
password_db = "userpassword"
database_name = "user_db"

app = FastAPI()

# Modelos de datos
class FavoriteBase(BaseModel):
    video_id: int

class Favorite(FavoriteBase):
    user_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str
    email: str
    edad: int
    genero: str
    ciudad: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    favorites: List[Favorite] = []

    class Config:
        orm_mode = True

def get_db():
    return mysql.connector.connect(
        host=host_name,
        port=port_number,
        user=user_name,
        password=password_db,
        database=database_name
    )

@app.get("/", tags=["health"])
def health_check():
    return {"status": "API is running"}

@app.post("/user", response_model=User, tags=["users"])
def create_user(user: UserCreate):
    db = get_db()
    cursor = db.cursor()
    try:
        # 1) Insertar usuario (AUTO_INCREMENT asigna el id)
        cursor.execute("""
            INSERT INTO users (username, email, edad, genero, ciudad, password)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (user.username, user.email, user.edad, user.genero, user.ciudad, user.password))
        user_id = cursor.lastrowid

        db.commit()
    finally:
        cursor.close()
        db.close()

    # Devolvemos el objeto User vacío de favoritos
    return User(
        id=user_id,
        username=user.username,
        email=user.email,
        edad=user.edad,
        genero=user.genero,
        ciudad=user.ciudad,
        favorites=[]
    )

@app.get("/users", response_model=List[User], tags=["users"])
def get_users():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT
              u.id, u.username, u.email, u.edad, u.genero, u.ciudad,
              f.video_id
            FROM users u
            LEFT JOIN favorites f ON u.id = f.id
        """)
        rows = cursor.fetchall()
    finally:
        cursor.close()
        db.close()

    # agrupar favoritos por usuario
    users_map = {}
    for row in rows:
        uid = row["id"]
        if uid not in users_map:
            users_map[uid] = {
                "id": uid,
                "username": row["username"],
                "email": row["email"],
                "edad": row["edad"],
                "genero": row["genero"],
                "ciudad": row["ciudad"],
                "favorites": []
            }
        if row["video_id"] is not None:
            users_map[uid]["favorites"].append(Favorite(user_id=uid, video_id=row["video_id"]))

    return [User(**u) for u in users_map.values()]

@app.get("/user/{user_id}", response_model=User, tags=["users"])
def get_user(user_id: int):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT
              u.id, u.username, u.email, u.edad, u.genero, u.ciudad,
              f.video_id
            FROM users u
            LEFT JOIN favorites f ON u.id = f.id
            WHERE u.id = %s
        """, (user_id,))
        rows = cursor.fetchall()
    finally:
        cursor.close()
        db.close()

    if not rows:
        raise HTTPException(status_code=404, detail="User not found")

    base = rows[0]
    favorites = [Favorite(user_id=user_id, video_id=r["video_id"]) 
                 for r in rows if r["video_id"] is not None]

    return User(
        id=user_id,
        username=base["username"],
        email=base["email"],
        edad=base["edad"],
        genero=base["genero"],
        ciudad=base["ciudad"],
        favorites=favorites
    )

@app.patch("/user/{user_id}", response_model=User, tags=["users"])
def update_user(user_id: int, user: UserCreate):
    db = get_db()
    cursor = db.cursor()
    try:
        # 1) Actualizar datos de usuario
        cursor.execute("""
            UPDATE users
            SET username=%s, email=%s, edad=%s, genero=%s, ciudad=%s, password=%s
            WHERE id=%s
        """, (user.username, user.email, user.edad, user.genero, user.ciudad, user.password, user_id))

        # 2) (Opcional) No estamos manejando favoritos aquí; usa los endpoints de /favorite
        db.commit()
    finally:
        cursor.close()
        db.close()

    # Devolver el user actualizado (sin reconsultar por simplicidad)
    return User(
        id=user_id,
        username=user.username,
        email=user.email,
        edad=user.edad,
        genero=user.genero,
        ciudad=user.ciudad,
        favorites=[]  # si quieres incluirlos, podrías reusar get_user()
    )

@app.delete("/user/{user_id}", tags=["users"])
def delete_user(user_id: int):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM favorites WHERE id=%s", (user_id,))
        cursor.execute("DELETE FROM users WHERE id=%s", (user_id,))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return {"message": "User deleted successfully"}

@app.post("/favorite", response_model=Favorite, tags=["favorites"])
def add_favorite(item: FavoriteBase, user_id: int):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO favorites (id, video_id) VALUES (%s, %s)
        """, (user_id, item.video_id))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return Favorite(user_id=user_id, video_id=item.video_id)

@app.delete("/favorite/{user_id}/{video_id}", tags=["favorites"])
def delete_favorite(user_id: int, video_id: int):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            DELETE FROM favorites WHERE id=%s AND video_id=%s
        """, (user_id, video_id))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return {"message": "Favorite removed"}

@app.get("/favorites/{user_id}", response_model=List[Favorite], tags=["favorites"])
def get_favorites(user_id: int):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT id AS user_id, video_id
            FROM favorites
            WHERE id = %s
        """, (user_id,))
        rows = cursor.fetchall()
    finally:
        cursor.close()
        db.close()
    return [Favorite(**r) for r in rows]