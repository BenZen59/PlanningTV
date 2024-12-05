import React, { useEffect, useState } from "react";
import fetchPlanningTV from "./api/planningTvApi";
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlanningTV();

        // Trie les séries par popularité décroissante
        const sortedShows = (data.results || []).sort(
          (a, b) => b.popularity - a.popularity
        );

        setShows(sortedShows);
      } catch (err) {
        setError(err); // Gère les erreurs
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Émissions TV les plus populaires diffusées aujourd'hui</h1>
      {error && <p className="error">Erreur : {error.message}</p>}
      <div className="shows-container">
        {shows.map((show) => (
          <div key={show.id} className="show-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
              alt={`${show.name} Poster`}
              className="show-poster"
            />
            <div className="show-details">
              <h2 className="show-title">{show.name}</h2>
              <p className="show-score">Score : {show.vote_average}/10</p>
              <p className="show-date">Date de début : {show.first_air_date}</p>
              {/* <p className="show-popularity">Popularité : {show.popularity}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
