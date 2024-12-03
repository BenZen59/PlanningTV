import React, { useEffect, useState } from "react";
import fetchPlanningTV from "./api/planningTvApi";
import "./App.css";

function App() {
  // État pour stocker les données récupérées
  const [tvData, setTvData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les données via fetchPlanningTV
    const getData = async () => {
      try {
        const data = await fetchPlanningTV();
        console.log(data); // Inspecter les données de l'API
        setTvData(data); // Stocker les données dans l'état
      } catch (err) {
        setError(
          "Une erreur est survenue lors de la récupération des données.",
        );
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="App">
      <h1>Planning TV</h1>
      {loading && <p>Chargement des données...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {tvData.length > 0 ? (
            tvData.map((show) => {
              const airDate = show.first_air_date
                ? new Date(show.first_air_date).toLocaleDateString("fr-FR")
                : "Non disponible";
              return (
                <li key={show.id}>
                  <strong>{show.name}</strong> - Première diffusion le :{" "}
                  {airDate}
                </li>
              );
            })
          ) : (
            <p>Aucun épisode à venir.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
