import axios from "axios";

// Configuration de base de l'API TMDb
const API_URL = "https://api.themoviedb.org/3/tv/on_the_air";
const TRANSLATION_URL = "https://api.themoviedb.org/3/tv/{tv_id}/translations"; // Endpoint pour traductions

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzQ0MzIxY2MyZjMwNDEwOTY1NGFjMzNlOWEyNGE2NSIsIm5iZiI6MTczMjcxNjc0MC4yNjAzNjQ4LCJzdWIiOiI2MTdhZDNlMzUyOTRlNzAwMmE0N2NhMzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F7LmneqysfIoeNWoObFvAscXufv0WtuJhOcEOT5mVh0",
};

// Fonction pour récupérer les données de l'API et gérer la pagination
const fetchPlanningTV = async () => {
  try {
    let allResults = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages) {
      const response = await axios.get(API_URL, {
        headers: API_HEADERS,
        params: { language: "fr-FR", region: "FR", page: currentPage },
      });

      const results = response.data.results;

      // Pour chaque série, on récupère sa traduction en français
      const resultsWithFrenchName = await Promise.all(
        results.map(async (show) => {
          try {
            const translationResponse = await axios.get(
              TRANSLATION_URL.replace("{tv_id}", show.id),
              {
                headers: API_HEADERS,
                params: { language: "fr" },
              },
            );
            const frenchName =
              translationResponse.data.translations.find(
                (translation) => translation.iso_639_1 === "fr",
              )?.name || show.name;
            return { ...show, french_name: frenchName }; // Ajoute le nom français à l'objet
          } catch (translationError) {
            console.error("Erreur de traduction", translationError);
            return { ...show, french_name: show.name }; // Si l'API des traductions échoue, utilise le nom d'origine
          }
        }),
      );

      allResults = [...allResults, ...resultsWithFrenchName];
      currentPage += 1;
      totalPages = response.data.total_pages;
    }

    return allResults;
  } catch (error) {
    console.error("Erreur lors de la récupération des données TMDb :", error);
    throw error;
  }
};

export default fetchPlanningTV;
