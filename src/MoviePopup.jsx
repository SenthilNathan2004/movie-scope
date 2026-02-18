import { useEffect, useState } from "react";

const API_URL = "https://www.omdbapi.com/?apikey=b169cf0";

const MoviePopup = ({ imdbID, onClose }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}&i=${imdbID}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [imdbID]);

  if (!movie) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✕</button>

        <img src={movie.Poster} alt={movie.Title} />

        <div className="modal-details">
          <h2>{movie.Title}</h2>
          <p><strong>IMDb:</strong> ⭐ {movie.imdbRating}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MoviePopup;
