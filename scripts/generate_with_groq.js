// ----- generate_with_groq.js -----
const fs = require("fs");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

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

  if (!json.choices || !json.choices[0]) {
    console.error("❌ Réponse Groq invalide :", json);
    throw new Error("Groq n'a pas renvoyé de résultat.");
  }

  return json.choices[0].message.content;
}

// --------- 1) Menu ---------
async function generateMenu() {
  const prompt = `
Tu génères un menu de 7 jours :
- 1400 kcal/jour
- Sans blé, sans lactose (OK végétal/brebis/chèvre)
- Jeûne 17:7
- 1 brunch + 1 collation + 1 dîner / jour
Format JSON strict :
[
  { "jour": "Jour 1", "brunch": "...", "collation": "...", "diner": "..." }
]
`;

  const output = await askGroq(prompt);
  fs.writeFileSync("data/menu.json", output);
  console.log("🍽️ menu.json généré");
}

// --------- 2) Recettes ---------
async function generateRecettes() {
  const menu = JSON.parse(fs.readFileSync("data/menu.json", "utf8"));

  const prompt = `
Génère toutes les RECETTES du menu suivant :
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

// --------- 3) Courses ---------
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
  console.log("🛒 courses.json généré");
}

// --------- 4) Sport ---------
async function generateSport() {
  const prompt = `
Plan sport 7 jours :
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
  console.log("💪 sport.json généré");
}

// --------- Main ---------
async function main() {
  await generateMenu();
  await generateRecettes();
  await generateCourses();
  await generateSport();
}

main();
