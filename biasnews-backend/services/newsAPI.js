const axios = require("axios");
const { formatDate } = require("../utils/date");

const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

async function getArticles(sourceId, keyword) {
  const today = new Date();
  const threedaysAgo = new Date(today);
  threedaysAgo.setDate(today.getDate() - 3);
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: keyword,
        sources: sourceId,
        sortBy: "publishedAt",
        from: formatDate(today),
        to: formatDate(threedaysAgo),
        language: "en",
        apiKey: NEWSAPI_KEY,
      },
    });

    return response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      content: article.content,
      source: article.source.name,
    }));
  } catch (err) {
    console.error("Error fetching articles from NewsAPI:", err.message);
    return [];
  }
}

module.exports = { getArticles };
