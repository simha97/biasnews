const express = require("express");
const cors = require("cors");
const { analyzeArticles } = require("./index.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  const keyword = req.body.keyword || "Gaza"; // fallback keyword


  try {
    const result = await analyzeArticles(keyword);
    res.json({ analysis: result });
  } catch (error) {
    console.error("Error analyzing articles:", error);
    res.status(500).json({ error: "Failed to analyze articles." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
