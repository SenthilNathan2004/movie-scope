import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import MoviePopup from "./MoviePopup";

const API_URL = "https://www.omdbapi.com/?apikey=b169cf0";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("");

  const suggestions = [
    "Interstellar",
    "Avengers",
    "Joker",
    "Bahubali",
    "Inception",
  ];

  const searchMovies = async (title) => {
    if (!title) return;

    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  useEffect(() => {
    const random =
      suggestions[Math.floor(Math.random() * suggestions.length)];
    searchMovies(random);
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchType =
      typeFilter === "all" || movie.Type === typeFilter;
    const matchYear =
      yearFilter === "" || movie.Year.includes(yearFilter);
    return matchType && matchYear;
  });

  return (
    <div className="app">
      <header className="navbar">
        <h1 className="brand">MovieScope</h1>
      </header>

      <section className="controls">
        <input
          className="search-input"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies(searchTerm)}
        />

        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>

        <input
          type="text"
          placeholder="Year"
          onChange={(e) => setYearFilter(e.target.value)}
        />

        <button onClick={() => searchMovies(searchTerm)}>
          Search
        </button>
      </section>

      <section className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onSelect={() => setSelectedMovie(movie.imdbID)}
          />
        ))}
      </section>

      {selectedMovie && (
        <MoviePopup
          imdbID={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
