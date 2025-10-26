import axios from "axios";

export default async function handler(req, res) {
  const query = req.query.q || "technology";
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY1;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not set" });
  }

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("News API fetch error:", error.response?.status, error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
