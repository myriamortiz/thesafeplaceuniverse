// ----- generate_with_groq.js -----
const fs = require("fs");

// --- Node 18+ inclut déjà fetch nativement ---
const fetch = global.fetch;

const apiKey = process.env.GROQ_API_KEY;

async function askGroq(prompt) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const json = await response.json();

  return json.choices[0].message.content;
}

// --------- 1) Générer le menu ---------
async function generateMenu() {
  const prompt = `
Tu es nutritionniste et tu génères un menu complet pour 7 jours.
Règles :
- 1400 kcal/jour
- Sans blé (alternatives sans gluten OK)
- Sans lactose (OK végétal / brebis / chèvre)
- Jeûne 17:7
- 2 repas + 1 collation : brunch, collation, dîner
Format JSON strict :
[
  { "jour": "Jour X", "brunch": "...", "collation": "...", "diner": "..." }
]
  `;

  const output = await askGroq(prompt);
  fs.writeFileSync("data/menu.json", output);
  console.log("🍽️ menu.json généré via Groq");
}

// --------- 2) Générer les recettes ---------
async function generateRecettes() {
  const menu = JSON.parse(fs.readFileSync("data/menu.json", "utf8"));
  const prompt = `
Génère toutes les recettes du MENU suivant :
${JSON.stringify(menu)}

FORMAT JSON STRICT :
[
  {
    "jour": "Jour X",
    "brunch": { "ingredients": [...], "instructions": "..." },
    "collation": { "ingredients": [...], "instructions": "..." },
    "diner": { "ingredients": [...], "instructions": "..." }
  }
]
  `;
  const output = await askGroq(prompt);
  fs.writeFileSync("data/recettes.json", output);
  console.log("📖 recettes.json généré via Groq");
}

// --------- 3) Générer la liste des courses ---------
async function generateCourses() {
  const recettes = JSON.parse(fs.readFileSync("data/recettes.json", "utf8"));

  let list = [];
  recettes.forEach(day => {
    list.push(...day.brunch.ingredients);
    list.push(...day.collation.ingredients);
    list.push(...day.diner.ingredients);
  });

  const unique = [...new Set(list.map(i => i.trim()))];

  fs.writeFileSync("data/courses.json", JSON.stringify(unique, null, 2));
  console.log("🛒 courses.json généré !");
}

// --------- 4) Générer le sport ---------
async function generateSport() {
  const prompt = `
Génère un planning de sport pour 7 jours :
- 4 séances maison (45 min)
- 1 séance bachata mercredi
- 2 jours repos actif

Format JSON strict :
[
  { "jour": "Lundi", "exercice": "..." }
]
  `;
  const output = await askGroq(prompt);
  fs.writeFileSync("data/sport.json", output);
  console.log("💪 sport.json généré !");
}

// --------- Lancer ---------
async function main() {
  await generateMenu();
  await generateRecettes();
  await generateCourses();
  await generateSport();
}

main();
