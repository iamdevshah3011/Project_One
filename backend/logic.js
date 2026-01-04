// /elevate-ai-project/backend/logic.js
const KEYWORDS = [
  'JavaScript','Node.js','Express','React','CSS','HTML','AWS','Docker','Git','Agile',
  'Machine Learning','Python','Java','SQL','TypeScript','Algorithms','Communication','Leadership'
];

function analyzeText(text) {
  const found = KEYWORDS.filter(kw => {
    const regex = new RegExp('\\b' + kw + '\\b', 'i');
    return regex.test(text);
  });
  // Simple score:  (found keywords count) * 10, capped at 100
  let score = Math.min(100, found.length * 10 + Math.floor(Math.random() * 5));
  if (score < 0) score = 0;
  return { keywords: found, score };
}

module.exports = { analyzeText };
