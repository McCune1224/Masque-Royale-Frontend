import "vite";
const PUBLIC_BACKEND_URL = "http://localhost:3000";
async function fetchWrapper(endpoint, options = {}) {
  const response = await fetch(`${PUBLIC_BACKEND_URL}${endpoint}`, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `API request failed on endpoint ${endpoint}`);
  }
  return response.json();
}
async function getGames() {
  return fetchWrapper("/api/games/");
}
async function gamesGetByID(id) {
  return fetchWrapper(`/api/games/${id}`);
}
async function gamesCreate(name) {
  try {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    };
    return fetchWrapper(`/api/games`, opts);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export {
  gamesCreate as a,
  gamesGetByID as b,
  getGames as g
};
