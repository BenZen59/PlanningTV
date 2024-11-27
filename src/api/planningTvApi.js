import axios from "axios";

const planningTVApi = {
  method: "GET",
  url: "https://api.themoviedb.org/3/tv/on_the_air",
  params: { language: "fr-FR", page: "1" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzQ0MzIxY2MyZjMwNDEwOTY1NGFjMzNlOWEyNGE2NSIsIm5iZiI6MTczMjcxNjc0MC4yNjAzNjQ4LCJzdWIiOiI2MTdhZDNlMzUyOTRlNzAwMmE0N2NhMzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F7LmneqysfIoeNWoObFvAscXufv0WtuJhOcEOT5mVh0",
  },
};

export default planningTVApi;
