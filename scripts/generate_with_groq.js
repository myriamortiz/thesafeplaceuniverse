// ----- generate_with_groq.js -----
const fs = require("fs");

// Import compatible GitHub Actions
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const apiKey = process.env.GROQ_API_KEY;

// ------------------------------------------------------------
// 🔥 EXTRACTION + CORRECTION AUTOMATIQUE DU JSON
// ------------------------------------------------------------
function extractJSON(text) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]") + 1;

  if (start === -1 || end === 0) {
    throw new Error("Aucun JSON trouvé dans la réponse du modèle.");
  }

  let jsonStr = text.slice(start, end);

  // 🔥 Correction automatique
  jsonStr = jsonStr
    .replace(/“|”/g, '"')         // guillemets typographiques
    .replace(/‘|’/g, "'")         // apostrophes typographiques
    .replace(/\r?\n/g, "\\n")     // retours ligne sécurisés
    .replace(/\t/g, " ")          // tabulations
    .replace(/\\(?!["\\/bfnrt])/g, "\\\\"); // corrections antislash

  // 💥 test : JSON valide ?
  try {
    JSON.parse(jsonStr);
  } catch (e) {
    console.error("❌ JSON invalide même après correction :", jsonStr);
    throw new Error("La réponse Groq contient un JSON impossible à parser.");
  }

  return jsonStr;
}

// ------------------------------------------------------------
// 🔥 FONCTION APPEL GROQ
// ------------------------------------------------------------
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
      max_tokens: 2048,
      temperature: 0.6
    })
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("❌ ERREUR HTTP GROQ :", response.status, text);
    throw new Error("Requête Groq échouée.");
  }

  const json = await response.json();

  if (!json.choices || !json.choices[0]) {
    throw new Error("Aucune génération reçue de Groq.");
  }

  const raw = json.choices[0].message.content.trim();

  return extractJSON(raw);
}

// ------------------------------------------------------------
// 1) MENU — L'IA génère 7 jours COMPLETS
// ------------------------------------------------------------
async function generateMenu() {
  const prompt = `
Réponds STRICTEMENT en JSON. Aucun texte avant ou après.

Format :
[
  { "jour": "Jour 1", "brunch": "", "collation": "", "diner": "" }
]

Règles :
- 7 jours
- 1400 kcal/jour
- Sans blé
- Sans lactose (OK chèvre / brebis / végétal)
- Jeûne 17:7
- Toujours 3 repas : brunch, collation, dîner
- Variés (pas de répétition)
  `;

  const output = await askGroq(prompt);
  fs.writeFileSync("data/menu.json", output);
  console.log("🍽️ menu.json généré");
}

// ------------------------------------------------------------
// 2) RECETTES — L'IA génère TOUTES les recettes complètes
// ------------------------------------------------------------
async function generateRecettes() {
  const menu = JSON.parse(fs.readFileSync("data/menu.json", "utf8"));

  const prompt = `
Réponds STRICTEMENT en JSON. Aucun texte autour.

Produis toutes les recettes pour ce menu :
${JSON.stringify(menu)}

Format :
[
  {
    "jour": "Jour 1",
    "brunch": {
      "nom": "",
      "ingredients": [],
      "instructions": ""
    },
    "collation": {
      "nom": "",
      "ingredients": [],
      "instructions": ""
    },
    "diner": {
      "nom": "",
      "ingredients": [],
      "instructions": ""
    }
  }
]

Règles :
- Ingrédients clairs, simples, précis
- Instructions courtes mais complètes
- 100% sans blé
- Sans lactose (OK chèvre/brebis)
- Format JSON STRICT
  `;

  const output = await askGroq(prompt);
  fs.writeFileSync("data/recettes.json", output);
  console.log("📖 recettes.json généré");
}

// ------------------------------------------------------------
// 3) COURSES — liste unique TRIÉE
// ------------------------------------------------------------
async function generateCourses() {
  const recettes = JSON.parse(fs.readFileSync("data/recettes.json", "utf8"));

  const all = recettes.flatMap(day =>
    [...day.brunch.ingredients, ...day.collation.ingredients, ...day.diner.ingredients]
  );

  const unique = [...new Set(all.map(i => i.trim()))];

  fs.writeFileSync("data/courses.json", JSON.stringify(unique, null, 2));
  console.log("🛒 courses.json généré");
}

// ------------------------------------------------------------
// 4) SPORT — programme 7 jours
// ------------------------------------------------------------
async function generateSport() {
  const prompt = `
Réponds STRICTEMENT en JSON. Aucun texte autour.

Format :
[
  { "jour": "Lundi", "exercice": "" }
]

Règles :
- 4 séances maison (45 min)
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
