const MovieCard = ({ movie, onSelect }) => {
  return (
    <div className="movie-card" onClick={onSelect}>
      <div className="poster-wrapper">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/400"
          }
          alt={movie.Title}
        />
        <span className="badge">{movie.Type.toUpperCase()}</span>
      </div>

      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
