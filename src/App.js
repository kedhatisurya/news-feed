import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("technology");
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const API_URL = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${API_KEY}`;

  useEffect(() => {
    fetchNews();
  }, [query]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(API_URL);
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.elements.search.value;
    if (input.trim() !== "") setQuery(input);
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-500">
        {/* Header */}
        <header className="flex justify-between items-center p-6 shadow-md bg-white dark:bg-gray-800">
          <h1 className="text-2xl font-bold">📰 Live News Feed</h1>
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch}>
              <input
                name="search"
                placeholder="Search news..."
                className="px-3 py-2 rounded-md outline-none border dark:bg-gray-700 dark:text-gray-100"
              />
              <button className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Search
              </button>
            </form>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md"
            >
              {darkMode ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        {/* News List */}
        <main className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-2">{article.title}</h2>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {article.description?.slice(0, 100)}...
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 font-medium hover:underline"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg col-span-full">
              No articles found. Try another keyword.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
