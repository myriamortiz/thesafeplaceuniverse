// ----- generate_with_groq.js -----
const fs = require("fs");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const apiKey = process.env.GROQ_API_KEY;

// --- EXTRACT JSON SOLIDE ---
function extractJSON(text) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]") + 1;

  if (start === -1 || end === 0) {
    console.error("❌ CONTENU REÇU :", text);
    throw new Error("Aucun JSON détecté.");
  }

  const jsonStr = text.slice(start, end);

  try {
    JSON.parse(jsonStr);
  } catch (e) {
    console.error("❌ JSON extrait non valide :", jsonStr);
    throw e;
  }

  return jsonStr;
}

// --- Requête Groq ---
async function askGroq(prompt) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 4096
      })
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("❌ HTTP ERROR :", text);
    throw new Error("Requête Groq échouée.");
  }

  const json = await response.json();
  const raw = json.choices?.[0]?.message?.content || "";

  return extractJSON(raw);
}

// --- 1) MENU ---
async function generateMenu() {
  const prompt = `
Répond UNIQUEMENT par un JSON strict. Pas de texte avant/après.

[
  { "jour": "Jour 1", "brunch": "", "collation": "", "diner": "" }
]

7 jours, 1400 kcal, sans blé, sans lactose (chèvre/brebis OK), brunch+collation+dîner.
`;
  const out = await askGroq(prompt);
  fs.writeFileSync("data/menu.json", out);
  console.log("🍽️ menu.json OK");
}

// --- 2) RECETTES ---
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
  // 1) On demande les recettes à Groq
  const output = await askGroq(prompt);

  // 2) On parse le JSON renvoyé par Groq
  let recettes = JSON.parse(output);

  // 3) On ajoute un champ "nom" pour éviter les "undefined"
  recettes = recettes.map((day) => ({
    ...day,
    brunch: {
      ...day.brunch,
      nom: day.brunch?.nom || "Brunch"
    },
    collation: {
      ...day.collation,
      nom: day.collation?.nom || "Collation"
    },
    diner: {
      ...day.diner,
      nom: day.diner?.nom || "Dîner"
    }
  }));

  // 4) On sauvegarde le JSON propre
  fs.writeFileSync("data/recettes.json", JSON.stringify(recettes, null, 2));
  console.log("📖 recettes.json OK (avec noms)");
}

// --- 3) COURSES ---
async function generateCourses() {
  const recettes = JSON.parse(fs.readFileSync("data/recettes.json", "utf8"));
  const all = recettes.flatMap(day => [
    ...day.brunch.ingredients,
    ...day.collation.ingredients,
    ...day.diner.ingredients
  ]);

  const unique = [...new Set(all.map(i => i.trim()))];
  fs.writeFileSync("data/courses.json", JSON.stringify(unique, null, 2));
  console.log("🛒 courses.json OK");
}

// --- 4) SPORT ---
async function generateSport() {
  const prompt = `
Répond UNIQUEMENT par un JSON strict.

[
  { "jour": "Lundi", "exercice": "" }
]

4 séances maison 45 min, 1 bachata mercredi, 2 repos actifs.
`;

  const out = await askGroq(prompt);
  fs.writeFileSync("data/sport.json", out);
  console.log("💪 sport.json OK");
}

// --- MAIN ---
async function main() {
  await generateMenu();
  await generateRecettes();
  await generateCourses();
  await generateSport();
}

main();
