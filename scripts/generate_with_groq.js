const fs = require("fs");
const fetch = require("node-fetch");

const API_KEY = process.env.GROQ_API_KEY;

// ------------------------------------------------------------
// EXTRACT JSON — VERSION ULTRA ROBUSTE
// ------------------------------------------------------------
function extractJSON(text) {
  // 1) Localiser les crochets JSON
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]") + 1;

  if (start === -1 || end === 0) {
    throw new Error("Aucun JSON trouvé dans la réponse.");
  }

  let jsonStr = text.slice(start, end);

  // 2) Nettoyage AGRESSIF
  jsonStr = jsonStr
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'")
    .replace(/\r?\n/g, " ")
    .replace(/\t/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(/\u202F/g, " ")
    .replace(/\u2009/g, " ")
    .replace(/\u200B/g, "")
    .replace(/\uFEFF/g, "")
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, "")
    .replace(/\s+/g, " ");

  // 3) Validation JSON
  try {
    JSON.parse(jsonStr);
  } catch (e) {
    console.error("❌ JSON INVALIDÉ PAR L'IA :\n", jsonStr);
    throw new Error("Impossible de parser le JSON généré.");
  }

  return jsonStr;
}

// ------------------------------------------------------------
// APPEL GROQ — ULTRA SAFE
// ------------------------------------------------------------
async function askGroq(prompt) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4096
    })
  });

  const raw = await response.text();

  if (!response.ok) {
    console.error("❌ GROQ ERREUR HTTP :", raw);
    throw new Error("Erreur API Groq.");
  }

  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    console.error("❌ Réponse non JSON de Groq :", raw);
    throw new Error("Groq a renvoyé un format illisible.");
  }

  if (!json.choices || !json.choices[0]) {
    throw new Error("Groq n'a renvoyé aucun choix.");
  }

  const content = json.choices[0].message.content.trim();

  return extractJSON(content);
}

// ------------------------------------------------------------
// 1) MENU
// ------------------------------------------------------------
async function generateMenu() {
  const prompt = `
Réponds STRICTEMENT en JSON pur.

Format :
[
  { "jour": "Jour 1", "brunch": "", "collation": "", "diner": "" }
]

7 jours, différents, 1400 kcal, sans blé, sans lactose (chèvre/brebis OK).
`;

  const output = await askGroq(prompt);
  fs.writeFileSync("data/menu.json", output);
  console.log("🍽️ menu.json généré");
}

// ------------------------------------------------------------
// 2) RECETTES
// ------------------------------------------------------------
async function generateRecettes() {
  const menu = JSON.parse(fs.readFileSync("data/menu.json", "utf8"));

  const prompt = `
Réponds STRICTEMENT en JSON pur.

Produis les recettes détaillées pour ce menu :
${JSON.stringify(menu)}

Format :
[
 {
   "jour": "",
   "brunch": { "nom": "", "ingredients": [], "instructions": "" },
   "collation": { "nom": "", "ingredients": [], "instructions": "" },
   "diner": { "nom": "", "ingredients": [], "instructions": "" }
 }
]
`;

  const output = await askGroq(prompt);
  fs.writeFileSync("data/recettes.json", output);
  console.log("📖 recettes.json généré");
}

// ------------------------------------------------------------
// 3) COURSES
// ------------------------------------------------------------
async function generateCourses() {
  const recettes = JSON.parse(fs.readFileSync("data/recettes.json", "utf8"));

  const all = recettes.flatMap(r =>
    [...r.brunch.ingredients, ...r.collation.ingredients, ...r.diner.ingredients]
  );

  const unique = [...new Set(all.map(i => i.trim()))];

  fs.writeFileSync("data/courses.json", JSON.stringify(unique, null, 2));
  console.log("🛒 courses.json généré");
}

// ------------------------------------------------------------
// 4) SPORT
// ------------------------------------------------------------
async function generateSport() {
  const prompt = `
Réponds STRICTEMENT en JSON.

Format :
[
 { "jour": "Lundi", "exercice": "" }
]

4 séances (45 min), 1 bachata, 2 repos actifs.
`;

  const output = await askGroq(prompt);
  fs.writeFileSync("data/sport.json", output);
  console.log("💪 sport.json généré");
}

// ------------------------------------------------------------
// MAIN
// ------------------------------------------------------------
async function main() {
  await generateMenu();
  await generateRecettes();
  await generateCourses();
  await generateSport();
}

main();
