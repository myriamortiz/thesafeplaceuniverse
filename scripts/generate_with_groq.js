// ----- generate_with_groq.js -----
// Génération automatique SAFE PLACE : menu, recettes, courses, sport

const fs = require("fs");

// Import compatible GitHub Actions
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const apiKey = process.env.GROQ_API_KEY;

// Assure que le dossier data existe
if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}

// ------------------------------------------------------------
// OUTILS JSON ROBUSTES
// ------------------------------------------------------------

// Extrait le premier tableau JSON trouvé dans un texte
function extractJSONArray(text) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Aucun tableau JSON trouvé dans la réponse.");
  }

  // On prend tout entre le premier [ et le dernier ]
  return text.slice(start, end + 1).trim();
}

// Appel Groq et retourne soit un objet JS, soit null en cas d’erreur
async function askGroqJSON(prompt) {
  if (!apiKey) {
    console.error("❌ GROQ_API_KEY manquant dans les secrets GitHub.");
    return null;
  }

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
        max_tokens: 2048
      })
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("❌ ERREUR HTTP GROQ :", response.status, text);
    return null;
  }

  let data;
  try {
    data = await response.json();
  } catch (e) {
    console.error("❌ Impossible de décoder le JSON brut de Groq :", e);
    return null;
  }

  if (!data.choices || !data.choices[0]) {
    console.error("❌ Aucune choice dans la réponse Groq :", data);
    return null;
  }

  const raw = (data.choices[0].message.content || "").trim();

  try {
    const jsonStr = extractJSONArray(raw);
    const parsed = JSON.parse(jsonStr);
    return parsed;
  } catch (e) {
    console.error("❌ L'IA a renvoyé un JSON invalide :", e.message);
    // On garde le texte brut pour debug éventuel
    fs.writeFileSync("data/last_groq_raw.txt", raw, "utf8");
    return null;
  }
}

// ------------------------------------------------------------
// 1) MENU — IA + fallback
// ------------------------------------------------------------
async function generateMenu() {
  console.log("➡️ Génération du menu via Groq…");

  const prompt = `
Réponds STRICTEMENT en JSON. AUCUN texte avant ou après.

Format EXACT attendu :
[
  { "jour": "Jour 1", "brunch": "", "collation": "", "diner": "" }
]

Règles :
- 7 jours (Jour 1 à Jour 7)
- 1400 kcal/jour (approx)
- Sans blé
- Sans lactose (autorisés : chèvre, brebis, végétal)
- Compatible jeûne 17:7 (1 brunch + 1 collation + 1 dîner)
- Recettes variées, pas de répétitions exactes.
- N'utilise que des ingrédients simples (viandes, poissons, œufs, légumes, fruits, légumineuses, riz, quinoa, etc.).
`;

  const menu = await askGroqJSON(prompt);

  if (menu && Array.isArray(menu) && menu.length === 7) {
    fs.writeFileSync("data/menu.json", JSON.stringify(menu, null, 2), "utf8");
    console.log("✅ menu.json généré par l'IA");
    return menu;
  }

  console.warn("⚠️ Impossible de générer un menu valide avec Groq.");

  // Fallback : réutiliser le menu précédent s'il existe
  if (fs.existsSync("data/menu.json")) {
    console.log("↩️ Utilisation du menu.json existant (semaine précédente).");
    return JSON.parse(fs.readFileSync("data/menu.json", "utf8"));
  }

  // Fallback ultime : petit menu par défaut
  const defaultMenu = Array.from({ length: 7 }).map((_, i) => ({
    jour: `Jour ${i + 1}`,
    brunch: "Omelette, avocat, salade",
    collation: "Pomme et amandes",
    diner: "Poulet, riz, légumes verts"
  }));

  fs.writeFileSync(
    "data/menu.json",
    JSON.stringify(defaultMenu, null, 2),
    "utf8"
  );
  console.log("🟡 menu.json par défaut créé (premier lancement).");
  return defaultMenu;
}

// ------------------------------------------------------------
// 2) RECETTES — IA + fallback
// ------------------------------------------------------------
async function generateRecettes(menu) {
  console.log("➡️ Génération des recettes via Groq…");

  const prompt = `
Réponds STRICTEMENT en JSON. AUCUN texte autour.

Tu dois produire TOUTES les recettes pour ce menu :

${JSON.stringify(menu)}

Format EXACT attendu :
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
- 7 objets Jour (Jour 1 à Jour 7) dans le tableau.
- Chaque "ingredients" est un tableau de chaînes (ex: ["2 œufs", "100g de saumon"]).
- "instructions" = texte court et clair (1 à 3 phrases).
- Toujours 100% sans blé.
- Pas de lait de vache ni crème fraîche (OK chèvre, brebis, végétal).
- Utilise des ingrédients simples et réalistes.
`;

  const recettes = await askGroqJSON(prompt);

  if (
    recettes &&
    Array.isArray(recettes) &&
    recettes.length === 7 &&
    recettes[0].brunch &&
    recettes[0].collation &&
    recettes[0].diner
  ) {
    fs.writeFileSync(
      "data/recettes.json",
      JSON.stringify(recettes, null, 2),
      "utf8"
    );
    console.log("✅ recettes.json généré par l'IA");
    return recettes;
  }

  console.warn("⚠️ Impossible de générer des recettes valides avec Groq.");

  // Fallback : garder les anciennes recettes si elles existent
  if (fs.existsSync("data/recettes.json")) {
    console.log("↩️ Utilisation de recettes.json existant (semaine précédente).");
    return JSON.parse(fs.readFileSync("data/recettes.json", "utf8"));
  }

  // Fallback ultime : recettes très simples auto-générées depuis le menu
  const fallback = menu.map((day) => ({
    jour: day.jour,
    brunch: {
      nom: day.brunch || "Brunch",
      ingredients: ["Ingrédients à définir"],
      instructions: `Prépare un brunch équilibré basé sur : ${day.brunch}.`
    },
    collation: {
      nom: day.collation || "Collation",
      ingredients: ["Ingrédients à définir"],
      instructions: `Prépare une collation légère basée sur : ${day.collation}.`
    },
    diner: {
      nom: day.diner || "Dîner",
      ingredients: ["Ingrédients à définir"],
      instructions: `Prépare un dîner complet basé sur : ${day.diner}.`
    }
  }));

  fs.writeFileSync(
    "data/recettes.json",
    JSON.stringify(fallback, null, 2),
    "utf8"
  );
  console.log("🟡 recettes.json de secours généré (structure simple).");

  return fallback;
}

// ------------------------------------------------------------
// 3) COURSES — liste unique triée
// ------------------------------------------------------------
async function generateCourses(recettes) {
  console.log("➡️ Génération de la liste de courses…");

  const all = recettes.flatMap((day) => [
    ...(day.brunch?.ingredients || []),
    ...(day.collation?.ingredients || []),
    ...(day.diner?.ingredients || [])
  ]);

  const unique = [...new Set(all.map((i) => i.trim()).filter(Boolean))].sort();

  fs.writeFileSync(
    "data/courses.json",
    JSON.stringify(unique, null, 2),
    "utf8"
  );

  console.log("✅ courses.json généré");
}

// ------------------------------------------------------------
// 4) SPORT — IA + fallback simple
// ------------------------------------------------------------
async function generateSport() {
  console.log("➡️ Génération du planning sport via Groq…");

  const prompt = `
Réponds STRICTEMENT en JSON. AUCUN texte autour.

Format EXACT :
[
  { "jour": "Lundi", "type": "", "details": "" }
]

Règles :
- 7 objets (Lundi à Dimanche)
- 4 séances maison (45 min) type "séance full body", "bas du corps", etc.
- 1 séance Bachata le mercredi.
- 2 jours de repos actif (ex: marche, stretching doux).
- "type" = court ("Séance maison jambes", "Repos actif").
- "details" = liste rapide des exercices ou consignes.
`;

  const sport = await askGroqJSON(prompt);

  if (sport && Array.isArray(sport) && sport.length === 7) {
    fs.writeFileSync("data/sport.json", JSON.stringify(sport, null, 2), "utf8");
    console.log("✅ sport.json généré par l'IA");
    return;
  }

  console.warn("⚠️ Impossible de générer un planning sport valide avec Groq.");

  // Fallback : réutiliser existant
  if (fs.existsSync("data/sport.json")) {
    console.log("↩️ Utilisation de sport.json existant (semaine précédente).");
    return;
  }

  // Fallback ultime : planning fixe très simple
  const fallback = [
    { jour: "Lundi", type: "Séance maison full body", details: "Squats, fentes, gainage, pompes adaptées." },
    { jour: "Mardi", type: "Séance maison bas du corps", details: "Squats, hip thrust, fentes, pont fessier." },
    { jour: "Mercredi", type: "Bachata", details: "Cours / pratique bachata 45–60 min." },
    { jour: "Jeudi", type: "Séance maison haut du corps", details: "Rowing élastique, développé, gainage, bras." },
    { jour: "Vendredi", type: "Repos actif", details: "Marche 30–45 min, étirements doux." },
    { jour: "Samedi", type: "Repos actif", details: "Balade, mobilité douce, respiration." },
    { jour: "Dimanche", type: "Séance maison mix", details: "Circuit léger full body + stretching." }
  ];

  fs.writeFileSync("data/sport.json", JSON.stringify(fallback, null, 2), "utf8");
  console.log("🟡 sport.json de secours généré.");
}

// ------------------------------------------------------------
// MAIN
// ------------------------------------------------------------
async function main() {
  try {
    const menu = await generateMenu();
    const recettes = await generateRecettes(menu);
    await generateCourses(recettes);
    await generateSport();
    console.log("🎉 Génération hebdo SafePlace terminée.");
  } catch (e) {
    console.error("💥 Erreur fatale dans generate_with_groq.js :", e);
    process.exit(1);
  }
}

main();
