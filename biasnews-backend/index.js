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

You are given three groups of articles: left-leaning, center, and right-leaning. Each group contains news articles about the same topic (e.g., "${keyword}") published recently.

Your task is to:

1. Create a clear, objective **summary title** (8–15 words) that includes the keyword "${keyword}".
2. Identify key themes and summary bullet points from each group (left, center, right).
3. Compare how the left, center, and right sources reported the same events (differences in tone, emphasis, or omissions).
4. Identify any emotionally charged or biased language used in each side.
5. Return an object strictly in the following JSON format:

\`\`\`json
{
  "title": "string",
  "summaries": {
    "left": ["string", "..."],
    "center": ["string", "..."],
    "right": ["string", "..."]
  },
  "differences": ["string", "..."],
  "biasIndicators": ["string", "..."]
}
\`\`\`

DO NOT explain or add any commentary. DO NOT wrap the object with markdown (\`\`\`json). JUST return valid raw JSON.

Here are the articles:

${formatArticlesText("LEFT", grouped.left)}

${formatArticlesText("CENTER", grouped.center)}

${formatArticlesText("RIGHT", grouped.right)}
`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

const data = response.choices[0].message.content;

let analysis;
  try {

    analysis = JSON.parse(data);
    console.log(analysis)
} catch (err) {
  console.error("Failed to parse analysis:", err);
  throw new Error("Could not parse OpenAI response into JSON.");
}

  return analysis;
}

module.exports = { analyzeArticles };

