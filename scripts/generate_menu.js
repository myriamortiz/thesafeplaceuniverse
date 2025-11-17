import fs from "fs";

// Lire les recettes générées
const recettes = JSON.parse(fs.readFileSync("data/recettes.json", "utf8"));

// Transformer les recettes en menu simple
const menu = recettes.map(item => ({
  jour: item.jour,
  brunch: item.brunch.titre,
  collation: item.collation.titre,
  diner: item.diner.titre
}));

fs.writeFileSync("data/menu.json", JSON.stringify(menu, null, 2), "utf8");

console.log("🍱 Nouveau menu hebdo généré depuis recettes.json !");
