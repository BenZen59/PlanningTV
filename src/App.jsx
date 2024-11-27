import React, { useEffect, useState } from "react";
import axios from "axios";
import planningTVApi from "./api/planningTvApi";
import "./App.css";

function App() {
  // État pour stocker les données récupérées
  const [tvData, setTvData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appel à l'API lorsqu'on monte le composant
    axios
      .request(planningTVApi)
      .then((res) => {
        setTvData(res.data.results); // Assure-toi que `results` est bien la structure de l'API
      })
      .catch((err) => {
        console.error(err);
        setError("Une erreur est survenue lors de la récupération des données.");
      });
  }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une seule fois

  return (
    <div className="App">
      <h1>Planning TV</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {tvData.map((show) => (
          <li key={show.id}>
            <strong>{show.name}</strong> - Prochain épisode : {show.next_episode_to_air?.air_date || "Non disponible"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
