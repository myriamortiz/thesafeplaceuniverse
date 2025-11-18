// ------------------------------------------------------------
// generate_with_groq.js — VERSION STABLE
// ------------------------------------------------------------

const fs = require("fs");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const apiKey = process.env.GROQ_API_KEY;

// ------------------------------------------------------------
// 🔥 ExtractJSON : corrige TOUTES les merdes Unicode + JSON cassé
// ------------------------------------------------------------
function extractJSON(text) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]") + 1;

  if (start === -1 || end === 0) {
    throw new Error("Aucun JSON détecté dans la réponse.");
  }

  let jsonStr = text.slice(start, end);

  // ——————————————————————
  // SUPER NETTOYAGE JSON
  // ——————————————————————
  jsonStr = jsonStr
    .normalize("NFKD")                     // normalise accents
    .replace(/[\u0300-\u036f]/g, "")       // supprime accents invisibles
    .replace(/“|”/g, '"')                  // guillemets fancy → "
    .replace(/‘|’/g, "'")                  // apostrophes fancy → '
    .replace(/\r?\n/g, "\\n")              // retours ligne JSON-safe
    .replace(/\t/g, " ")                   // tabulations
    .replace(/\\(?!["\\/bfnrt])/g, "\\\\") // antislash invalides
    .replace(/\u00A0/g, " ");              // espace insécable invisible

  // Vérifier que c’est valide
  try {
    JSON.parse(jsonStr);
  } catch (e) {
    console.error("❌ JSON invalide :", jsonStr);
    throw new Error("Impossible de parser le JSON généré.");
  }

  return jsonStr;
}

// ------------------------------------------------------------
// 🧠 Requête Groq
// ------------------------------------------------------------
async function askGroq(prompt) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4096
    })
  });

  if (!response.ok) {
    const txt = await response.text();
    console.error("❌ ERREUR API :", txt);
    throw new Error("Requête IA échouée.");
  }

  const json = await response.json();

  if (!json.choices || !json.choices[0]) {
    throw new Error("Aucune réponse IA reçue.");
  }

  return extractJSON(json.choices[0].message.content.trim());
}

// ------------------------------------------------------------
// 1) MENU
// ------------------------------------------------------------
async function generateMenu() {
  const prompt = `
Réponds STRICTEMENT en JSON. Aucun texte avant ou après.

Format attendu :
[
  { "jour": "Jour 1", "brunch": "", "collation": "", "diner": "" }
]

Règles :
- 7 jours complets
- 1400 kcal
- Sans blé
- Sans lactose sauf chèvre/brebis/végétal
- Jeûne 17:7
- Varié et cohérent
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
Réponds STRICTEMENT en JSON.

Menu :
${JSON.stringify(menu)}

Génère les recettes correspondantes.  
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
- Pas de texte autour
- Ingrédients simples et clairs
- Instructions courtes et cohérentes
- Respect des règles alimentaires
  `;

  const output = await askGroq(prompt);
  fs.writeFileSync("data/recettes.json", output);
  console.log("📖 recettes.json généré");
}

// ------------------------------------------------------------
// 3) LISTE DE COURSES
// ------------------------------------------------------------
async function generateCourses() {
  const recettes = JSON.parse(fs.readFileSync("data/recettes.json", "utf8"));

  const all = recettes.flatMap(day => [
    ...day.brunch.ingredients,
    ...day.collation.ingredients,
    ...day.diner.ingredients
  ]);

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

Règles :
- 4 séances maison (45 min)
- Mercredi = bachata
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
