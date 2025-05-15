import React, { useEffect, useState } from "react";
import axios from "axios";

function RatingList({ videoId }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    if (!videoId) return;

    axios
      .get(`http://localhost:8000/ratings/${videoId}`)
      .then((res) => setRatings(res.data))
      .catch((err) => console.error("Error al obtener calificaciones:", err));
  }, [videoId]);

  const average =
    ratings.length > 0
      ? (
          ratings.reduce((sum, r) => sum + r.calificacion, 0) / ratings.length
        ).toFixed(1)
      : null;

  return (
    <div>
      <h4>Calificaciones</h4>
      {average && <p>Promedio: {average} / 5</p>}
      {ratings.length === 0 ? (
        <p>No hay calificaciones para este video aún.</p>
      ) : (
        <ul>
          {ratings.map((r, index) => (
            <li key={index}>
              Usuario {r.user_id}: {r.calificacion} ⭐
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RatingList;
