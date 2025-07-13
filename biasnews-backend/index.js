require("dotenv").config();
const openai = require("./config/openai");
const { getArticles } = require("./services/newsAPI");
const { sources } = require("./data/sources");
const { formatArticlesText } = require("./utils/formatArticles");


async function groupArticles(keyword) {
  const grouped = { left: [], center: [], right: [] };

  for (const bias in sources) {
    for (const source of sources[bias]) {
      const articles = await getArticles(source, keyword);
      grouped[bias].push(...articles);
    }
  }

  return grouped;
}

async function analyzeArticles(keyword) {
  const grouped = await groupArticles(keyword);

const prompt = `
You are a political news analyst.

You are given three groups of articles: left-leaning, center, and right-leaning. Each group contains news articles about the same topic (e.g., "Ukraine") published recently.

Your task is to:

1. Identify the main bullet points or key themes that each political bias (left, center, right) focused on.
2. Compare how the left, center, and right sources reported the same events. Highlight:
   - Differences in language, tone, or framing
   - What details each side emphasized or omitted
3. Point out any emotionally charged or biased language used.
4. Summarize how each side's coverage might influence a reader's perception.
5. Conclude with an objective summary of the actual facts mentioned across all sources.

Output structure:
- 🟦 Left Summary:
  - [bullet points]
- ⬜ Center Summary:
  - [bullet points]
- 🟥 Right Summary:
  - [bullet points]

🧩 Differences & Framing:
- [compare tone, emphasis, omissions]

🎯 Bias Indicators:
- [quotes or examples of biased language or emotional framing]

📰 Objective Cross-Source Summary:
- [factual summary across all sources without bias]

Here are the articles:

${formatArticlesText("LEFT", grouped.left)}

${formatArticlesText("CENTER", grouped.center)}

${formatArticlesText("RIGHT", grouped.right)}
`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

module.exports = { analyzeArticles };

