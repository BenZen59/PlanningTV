import axios from "axios";

// Configuration de base de l'API TMDb
const API_URL =
  "https://api.themoviedb.org/3/tv/airing_today?language=fr-FR&region=FR";

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzQ0MzIxY2MyZjMwNDEwOTY1NGFjMzNlOWEyNGE2NSIsIm5iZiI6MTczMjcxNjc0MC4yNjAzNjQ4LCJzdWIiOiI2MTdhZDNlMzUyOTRlNzAwMmE0N2NhMzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F7LmneqysfIoeNWoObFvAscXufv0WtuJhOcEOT5mVh0",
};

// Fonction pour récupérer les émissions TV diffusées aujourd'hui
async function fetchPlanningTV() {
  try {
    const response = await axios.get(API_URL, {
      headers: API_HEADERS,
    });

    // Retourne les données si la requête réussit
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);

    // Retourne un objet d'erreur ou lance l'erreur selon vos besoins
    throw error;
  }
}

export default fetchPlanningTV;
