// ----- generate_recettes.js -----

const fs = require("fs");

if (!fs.existsSync("data")) fs.mkdirSync("data");

const ingredientsBase = {
  "Omelette + avocat + patate douce": {
    ingredients: ["2 œufs", "1/2 avocat", "100g patate douce", "sel", "poivre"],
    instructions: "Cuire l’omelette, rôtir la patate douce, servir avec l’avocat."
  },
  "Galettes sarrasin + œuf + chèvre": {
    ingredients: ["2 galettes sarrasin", "1 œuf", "30g chèvre", "poivre"],
    instructions: "Garnir la galette avec œuf au plat et chèvre."
  },
  // (le reste peut être rempli progressivement ou étendu automatiquement)
};

const menu = JSON.parse(fs.readFileSync("data/menu.json", "utf8"));
let recettes = [];

menu.forEach(day => {
  recettes.push({
    jour: day.jour,
    brunch: ingredientsBase[day.brunch] || {
      ingredients: ["Ingrédients à définir"],
      instructions: "Instructions à définir"
    },
    collation: ingredientsBase[day.collation] || {
      ingredients: ["Ingrédients à définir"],
      instructions: "Instructions à définir"
    },
    diner: ingredientsBase[day.diner] || {
      ingredients: ["Ingrédients à définir"],
      instructions: "Instructions à définir"
    }
  });
});

fs.writeFileSync("data/recettes.json", JSON.stringify(recettes, null, 2));
console.log("✅ recettes.json généré");

