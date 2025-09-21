const API_BASE = "http://127.0.0.1:5000";  // Flask backend URL

export async function addFood(foodData) {
  const token = localStorage.getItem("idToken");

  const response = await fetch(`${API_BASE}/donor/add_food`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(foodData)
  });

  return response.json();
}
