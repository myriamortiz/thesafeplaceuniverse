// ------------------------------------------------------------
// Script complet SAFEPLACE – Generation Menu + Recettes + Courses + Sport
// VERSION STABILISÉE – JSON BLINDÉ
// ------------------------------------------------------------

const fs = require("fs");
const fetch = require("node-fetch");

// Assurer dossier data
if (!fs.existsSync("data")) fs.mkdirSync("data");

// ------------------------------------------------------------
//  UTILITAIRE : CORRECTION AUTOMATIQUE DU JSON IA
// ------------------------------------------------------------
function sanitizeJSON(text) {
  let jsonStr = text;

  // Retirer texte avant/après le JSON
  const start = jsonStr.indexOf("[");
  const end = jsonStr.lastIndexOf("]") + 1;

  if (start === -1 || end === 0) {
    throw new Error("Aucun JSON détecté dans la réponse IA.");
  }

  jsonStr = jsonStr.slice(start, end);

  // Correction des guillemets typographiques
  jsonStr = jsonStr
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'");

  // Convertir 'texte' → "texte"
  jsonStr = jsonStr.replace(/'([^']*)'/g, '"$1"');

  // Nettoyage unicode
  jsonStr = jsonStr
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u00A0|\u202F|\u2009|\u200B|\uFEFF/g, " ");

  // Compression espaces
  jsonStr = jsonStr.replace(/\s+/g, " ");

  return jsonStr;
}

// ------------------------------------------------------------
//  APPEL GROQ AVEC PROTECTION JSON
// ------------------------------------------------------------
async function askGroq(prompt) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("❌ ERREUR HTTP GROQ :", text);
    throw new Error("Erreur API Groq");
  }

  const data = await response.json();

  let raw = data?.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Aucune réponse IA reçue.");

  raw = raw.trim();

  // SANITIZE
  const clean = sanitizeJSON(raw);

  // TEST JSON
  try {
    JSON.parse(clean);
  } catch (err) {
    console.error("❌ JSON INVALID APRÈS SANITIZE");
    console.error(clean);
    throw new Error("JSON final non parseable.");
  }

  return clean;
}

// ------------------------------------------------------------
// 1) MENU
// ------------------------------------------------------------
async function generateMenu() {
  const prompt = `
Réponds STRICTEMENT en JSON.

Format :
[
  { "jour": "Jour 1", "brunch": "", "collation": "", "diner": "" }
]

Règles :
- 7 jours
- 1400 kcal/jour
- Sans blé
- Sans lactose (chèvre et brebis OK)
- Jeûne 17:7
- Jamais deux repas identiques dans la semaine
- 3 repas par jour : brunch, collation, dîner
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
Réponds STRICTEMENT EN JSON :

Génère les recettes complètes pour ce menu :
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

Règles :
- 100% sans blé
- Sans lactose sauf chèvre/brebis
- Portions simples et claires
- Instructions courtes mais complètes
- Format JSON STRICT
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

  const items = recettes.flatMap(day => [
    ...day.brunch.ingredients,
    ...day.collation.ingredients,
    ...day.diner.ingredients
  ]);

  const unique = [...new Set(items.map(i => i.trim()))];

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
  { "jour": "Lundi", "exercices": "" }
]

Règles :
- 4 séances de sport maison (45 min)
- 1 séance Bachata le mercredi
- 2 jours repos actif
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
