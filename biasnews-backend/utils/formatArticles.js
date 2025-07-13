function formatArticlesText(label, articles) {
  if (!articles.length) return `${label} ARTICLES:\nNo articles found.\n\n`;
  let text = `${label} ARTICLES:\n`;
  articles.forEach((a, i) => {
    text += `${i + 1}. Title: ${a.title}\n   Description: ${a.description || "N/A"}\n   Content: ${a.content || "N/A"}\n\n`;
  });
  return text;
}

module.exports = { formatArticlesText };
