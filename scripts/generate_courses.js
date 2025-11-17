const fs = require("fs");

// Lire recettes
const recettes = JSON.parse(fs.readFileSync("data/recettes.json", "utf8"));

let ingredients = [];

// Chaque jour contient brunch, collation, diner
recettes.forEach(day => {
  if (day.brunch?.ingredients) ingredients.push(...day.brunch.ingredients);
  if (day.collation?.ingredients) ingredients.push(...day.collation.ingredients);
  if (day.diner?.ingredients) ingredients.push(...day.diner.ingredients);
});

// Nettoyer les ingrédients
const clean = ingredients.map(i => i.trim());

// Supprimer les doublons
const unique = [...new Set(clean)];

fs.writeFileSync("data/courses.json", JSON.stringify(unique, null, 2), "utf8");

console.log("🛒 Liste de courses générée automatiquement !");
