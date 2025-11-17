// ----- generate_with_groq.js -----
const fs = require("fs");

// Import propre compatible GitHub Actions
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const apiKey = process.env.GROQ_API_KEY;

// ---------------------------
// Fonction d'appel Groq
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
      max_tokens: 1024
    })
  });

  // Si Groq renvoie pas un JSON valide
  if (!response.ok) {
    const text = await response.text();
    console.error("❌ ERREUR HTTP GROQ :", response.status, text);
    throw new Error("Requête Groq échouée.");
  }

  let json = {};
  try {
    json = await response.json();
  } catch (e) {
    console.error("❌ Impossible de décoder JSON :", e);
    throw new Error("Groq a renvoyé une réponse illisible.");
  }

  // Si aucune réponse modèle
  if (!json.choices || !json.choices[0]) {
    console.error("❌ Groq n’a rien renvoyé :", json);
    throw new Error("Groq n’a pas généré de texte.");
  }

  return json.choices[0].message.content;
}


// ---------------------------
// 1) MENU
// ---------------------------
async function generateMenu() {
  const prompt = `
Génère un menu de 7 jours :
- 1400 kcal/jour
- Sans blé, sans lactose (OK chèvre/brebis/végétal)
- Jeûne 17:7
- Format JSON strict :
[
  { "jour": "Jour 1", "brunch": "...", "collation": "...", "diner": "..." }
]
`;
  const output = await askGroq(prompt);
  fs.writeFileSync("data/menu.json", output);
  console.log("🍽️ menu.json généré");
}

// ---------------------------
// 2) RECETTES
// ---------------------------
async function generateRecettes() {
  const menu = JSON.parse(fs.readFileSync("data/menu.json", "utf8"));
  const prompt = `
Génère toutes les recettes du menu suivant :
${JSON.stringify(menu)}

Format JSON strict :
[
  {
    "jour": "Jour 1",
    "brunch": { "ingredients": [...], "instructions": "..." },
    "collation": { "ingredients": [...], "instructions": "..." },
    "diner": { "ingredients": [...], "instructions": "..." }
  }
]
`;
  const output = await askGroq(prompt);
  fs.writeFileSync("data/recettes.json", output);
  console.log("📖 recettes.json généré");
}

// ---------------------------
// 3) COURSES
// ---------------------------
async function generateCourses() {
  const recettes = JSON.parse(fs.readFileSync("data/recettes.json", "utf8"));

  let all = [];
  recettes.forEach(day => {
    all.push(...day.brunch.ingredients);
    all.push(...day.collation.ingredients);
    all.push(...day.diner.ingredients);
  });

  const unique = [...new Set(all.map(i => i.trim()))];

  fs.writeFileSync("data/courses.json", JSON.stringify(unique, null, 2));
  console.log("🛒 courses.json généré");
}

// ---------------------------
// 4) SPORT
// ---------------------------
async function generateSport() {
  const prompt = `
Plan sport 7 jours :
- 4 séances maison (45 min)
- Bachata mercredi
- 2 jours repos actif

Format JSON strict :
[
  { "jour": "Lundi", "exercice": "..." }
]
`;
  const output = await askGroq(prompt);
  fs.writeFileSync("data/sport.json", output);
  console.log("💪 sport.json généré");
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
