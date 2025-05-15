# Usa la imagen base de Python
FROM python:3.9-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo requirements.txt al contenedor
COPY requirements.txt .

# Instala las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia todos los archivos de la carpeta local al contenedor
COPY . .

# Expone el puerto que la aplicación FastAPI va a usar
EXPOSE 8000

# Ejecuta el servidor Uvicorn cuando se inicie el contenedor
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
