import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from sklearn.metrics.pairwise import cosine_similarity

# Conectar con la base de datos SQL Server
server = 'SQL\\SERVER2022'  # Cambia esto con tu servidor
database = 'DBCAPSTONE'  # Cambia esto con tu base de datos
username = 'usuario'  # Cambia esto con tu usuario
password = '202327'  # Cambia esto con tu contraseña

# Crear la conexión con SQLAlchemy
engine = create_engine(f'mssql+pyodbc://{username}:{password}@{server}/{database}?driver=SQL+Server')

# Obtener los datos de los libros y de los préstamos desde SQL Server
query_libros = "SELECT * FROM Libros"
query_prestamos = "SELECT * FROM Prestamos"
query_usuarios = "SELECT * FROM Usuarios"  # Si tienes una tabla de usuarios

libros_df = pd.read_sql(query_libros, engine)
prestamos_df = pd.read_sql(query_prestamos, engine)
usuarios_df = pd.read_sql(query_usuarios, engine)

# Filtrar los datos para obtener solo lo necesario
libros_df = libros_df[['LibroId', 'Titulo', 'Categoria']]

# Obtener el usuario específico (puedes cambiar el 'usuario_id' por la variable del usuario logueado)
usuario_id = 1  # Este sería el ID del usuario logueado, por ejemplo
usuario = usuarios_df[usuarios_df['UsuarioId'] == usuario_id].iloc[0]

# Obtener el historial de préstamos del usuario
prestamos_usuario_df = prestamos_df[prestamos_df['UsuarioId'] == usuario_id]

# Filtrar los libros que el usuario ha solicitado
prestamos_libros_df = pd.merge(prestamos_usuario_df, libros_df, on='LibroId')

# Obtener los géneros de los libros que ha solicitado el usuario
user_genres = prestamos_libros_df['Categoria'].value_counts()

# Obtener el género más solicitado por el usuario (esto sería el género favorito)
user_favorite_genre = user_genres.idxmax() if not user_genres.empty else None

# Si no hay género favorito, puedes asignar un valor por defecto o usar una recomendación aleatoria
if user_favorite_genre is None:
    user_favorite_genre = 'Romance'  # Género por defecto si no hay historial

print(f"El género favorito del usuario es: {user_favorite_genre}")

# Función para recomendar libros basados en el género favorito
def recommend_books_by_genre(user_favorite_genre, libros_df, top_n=6):
    # Filtramos los libros según el género favorito del usuario
    genre_books = libros_df[libros_df['Categoria'] == user_favorite_genre]
    
    # Si no hay suficientes libros en el género, complementamos con libros aleatorios
    if len(genre_books) < top_n:
        additional_books = libros_df[libros_df['Categoria'] != user_favorite_genre].sample(n=top_n-len(genre_books))
        genre_books = pd.concat([genre_books, additional_books])
    
    return genre_books[['Titulo', 'Categoria']].head(top_n)

# Obtener los libros recomendados por género
recommended_books = recommend_books_by_genre(user_favorite_genre, libros_df, top_n=6)

# Mostrar los libros recomendados
print(f"Libros recomendados para el género favorito '{user_favorite_genre}':")
print(recommended_books)
