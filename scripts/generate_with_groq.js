// ----- generate_with_groq.js -----
const fs = require("fs");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const apiKey = process.env.GROQ_API_KEY;

// ---------------------------
// EXTRACTION JSON BÉTON
// ---------------------------
function extractJSON(text) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]") + 1;

  if (start === -1 || end === -1) {
    throw new Error("Aucun JSON détecté dans la réponse.");
  }

  const jsonStr = text.slice(start, end);

  try {
    JSON.parse(jsonStr);
  } catch (e) {
    console.error("❌ JSON invalide extrait :", jsonStr);
    throw new Error("La réponse Groq contenait un JSON non valide.");
  }

  return jsonStr;
}

// ---------------------------
// Requête Groq
// ---------------------------
async function askGroq(prompt) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2048
    })
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("❌ ERREUR HTTP GROQ :", response.status, text);
    throw new Error("Erreur HTTP Groq.");
  }

  const json = await response.json();

  if (!json.choices || !json.choices[0]) {
    throw new Error("Groq n’a renvoyé aucun message.");
  }

  const raw = json.choices[0].message.content.trim();
  return extractJSON(raw);
}

// ---------------------------
// 1) MENU
// ---------------------------
async function generateMenu() {
  const prompt = `
Répond UNIQUEMENT par un tableau JSON strict. AUCUN texte avant ou après.

Format exact attendu :
[
  { "jour": "Jour 1", "brunch": "", "collation": "", "diner": "" }
]

Génère 7 jours :
- 1400 kcal
- sans blé
- sans lactose sauf chèvre/brebis
- brunch + collation + dîner
`;
  const output = await askGroq(prompt);
  fs.writeFileSync("data/menu.json", output);
  console.log("🍽️ menu.json OK");
}

// ---------------------------
// 2) RECETTES
// ---------------------------
async function generateRecettes() {
  const menu = JSON.parse(fs.readFileSync("data/menu.json", "utf8"));

  const prompt = `
Répond UNIQUEMENT par un tableau JSON strict.

Menu :
${JSON.stringify(menu)}

Format exact :
[
  {
    "jour": "Jour 1",
    "brunch": { "ingredients": [], "instructions": "" },
    "collation": { "ingredients": [], "instructions": "" },
    "diner": { "ingredients": [], "instructions": "" }
  }
]
`;
  const output = await askGroq(prompt);
  fs.writeFileSync("data/recettes.json", output);
  console.log("📖 recettes.json OK");
}

// ---------------------------
// 3) COURSES
// ---------------------------
async function generateCourses() {
  const recettes = JSON.parse(fs.readFileSync("data/recettes.json", "utf8"));

  const all = recettes.flatMap(day =>
    [...day.brunch.ingredients, ...day.collation.ingredients, ...day.diner.ingredients]
  );

  const unique = [...new Set(all.map(i => i.trim()))];

  fs.writeFileSync("data/courses.json", JSON.stringify(unique, null, 2));
  console.log("🛒 courses.json OK");
}

// ---------------------------
// 4) SPORT
// ---------------------------
async function generateSport() {
  const prompt = `
Répond UNIQUEMENT EN JSON strict.

[
  { "jour": "Lundi", "exercice": "" }
]

Génère :
- 4 séances maison 45 min
- 1 séance bachata mercredi
- 2 jours repos actif
`;
  const output = await askGroq(prompt);
  fs.writeFileSync("data/sport.json", output);
  console.log("💪 sport.json OK");
}

// ---------------------------
// MAIN
// ---------------------------
async function main() {
  await generateMenu();
  await generateRecettes();
  await generateCourses();
  await generateSport();
}

main();
