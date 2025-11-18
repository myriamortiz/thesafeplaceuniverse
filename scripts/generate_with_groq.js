// ----- generate_with_groq.js -----
// Génère automatiquement :
// - data/menu.json  (7 jours, brunch + collation + dîner)
// - data/recettes.json (ingrédients + instructions pour chaque repas)
// - data/courses.json  (liste de courses unique)
// - data/sport.json    (planning sport)
// 100% via l'IA Groq, sans base de données statique.

const fs = require("fs");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const apiKey = process.env.GROQ_API_KEY;

// ---------------------------
// 0) Petit helper pour extraire le JSON
// ---------------------------
function extractJSON(text) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]") + 1;

  if (start === -1 || end === 0) {
    throw new Error("Aucun JSON détecté dans la réponse de l'IA.");
  }

  const jsonStr = text.slice(start, end);

  // Vérifier que c’est bien du JSON valide
  try {
    JSON.parse(jsonStr);
  } catch (e) {
    console.error("❌ JSON invalide extrait :", jsonStr);
    throw new Error("L'IA a renvoyé un JSON invalide.");
  }

  return jsonStr;
}

// ---------------------------
// Appel générique à Groq
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
    throw new Error("Erreur HTTP Groq");
  }

  const json = await response.json();

  if (!json.choices || !json.choices[0]) {
    throw new Error("Groq n’a renvoyé aucun message.");
  }

  const raw = (json.choices[0].message.content || "").trim();
  return extractJSON(raw);
}

// ---------------------------
// 1) MENU – data/menu.json
// ---------------------------
async function generateMenu() {
  const prompt = `
Répond UNIQUEMENT par un tableau JSON. AUCUN texte avant ou après.

Génère un menu de 7 jours pour une femme :
- 1400 kcal / jour environ
- Sans blé
- Sans lactose classique (OK lait végétal, brebis, chèvre)
- Compatible jeûne 17:7
- 2 repas + 1 collation : brunch, collation, dîner

FORMAT EXACT OBLIGATOIRE :

[
  {
    "jour": "Jour 1",
    "brunch": "Nom du brunch + petit descriptif",
    "collation": "Nom de la collation + petit descriptif",
    "diner": "Nom du dîner + petit descriptif"
  }
]
`;

  const jsonStr = await askGroq(prompt);

  // On sauve tel quel (array de 7 objets)
  fs.writeFileSync("data/menu.json", jsonStr, "utf8");
  console.log("🍽️ menu.json généré via IA");
}

// ---------------------------
// 2) RECETTES – data/recettes.json
// ---------------------------
async function generateRecettes() {
  const menu = JSON.parse(fs.readFileSync("data/menu.json", "utf8"));

  const prompt = `
Répond UNIQUEMENT par un tableau JSON. AUCUN texte avant ou après.

À partir du MENU suivant :
${JSON.stringify(menu)}

Génère les RECETTES complètes de chaque repas.

CONTRAINTES :
- ~1400 kcal / jour
- Sans blé
- Sans lactose sauf chèvre/brebis/lait végétal
- Chaque brunch, collation, dîner doit avoir :
  - nom
  - liste d'ingrédients (en grammes si possible)
  - instructions claires et simples

FORMAT EXACT OBLIGATOIRE :

[
  {
    "jour": "Jour 1",
    "brunch": {
      "nom": "Nom du brunch",
      "ingredients": ["ingrédient 1", "ingrédient 2", "..."],
      "instructions": "Texte des étapes en français"
    },
    "collation": {
      "nom": "Nom de la collation",
      "ingredients": ["..."],
      "instructions": "..."
    },
    "diner": {
      "nom": "Nom du dîner",
      "ingredients": ["..."],
      "instructions": "..."
    }
  }
]
`;

  const jsonStr = await askGroq(prompt);
  fs.writeFileSync("data/recettes.json", jsonStr, "utf8");
  console.log("📖 recettes.json généré via IA");
}

// ---------------------------
// 3) COURSES – data/courses.json
// ---------------------------
async function generateCourses() {
  const recettes = JSON.parse(fs.readFileSync("data/recettes.json", "utf8"));

  const allIngredients = recettes.flatMap(day => [
    ...(day.brunch?.ingredients || []),
    ...(day.collation?.ingredients || []),
    ...(day.diner?.ingredients || [])
  ]);

  const unique = [...new Set(allIngredients.map(i => i.trim()))];

  fs.writeFileSync("data/courses.json", JSON.stringify(unique, null, 2), "utf8");
  console.log("🛒 courses.json généré automatiquement à partir des recettes IA");
}

// ---------------------------
// 4) SPORT – data/sport.json
// ---------------------------
async function generateSport() {
  const prompt = `
Répond UNIQUEMENT par un tableau JSON. AUCUN texte avant ou après.

Génère un planning SPORT sur 7 jours pour une femme qui :
- Veut 4 séances maison de 45 minutes (renfo/cardio doux)
- Fait une séance de bachata le mercredi
- A 2 jours de repos actif (marche, étirements)

FORMAT EXACT OBLIGATOIRE :

[
  {
    "jour": "Lundi",
    "exercice": "Texte décrivant la séance (ex: Full body doux 45 min : ...)"
  }
]
`;

  const jsonStr = await askGroq(prompt);
  fs.writeFileSync("data/sport.json", jsonStr, "utf8");
  console.log("💪 sport.json généré via IA");
}

// ---------------------------
// MAIN – appelé par GitHub Actions
// ---------------------------
async function main() {
  if (!fs.existsSync("data")) fs.mkdirSync("data");

  await generateMenu();
  await generateRecettes();
  await generateCourses();
  await generateSport();
}

main().catch(err => {
  console.error("❌ Erreur dans generate_with_groq.js :", err);
  process.exit(1);
});
