// ----- generate_menu.js -----

const fs = require("fs");

if (!fs.existsSync("data")) fs.mkdirSync("data");

// Brunch sans gluten/lactose-friendly
const brunches = [
  "Omelette + avocat + patate douce",
  "Galettes sarrasin + œuf + chèvre",
  "Smoothie bowl coco + granola sans gluten",
  "Bowl quinoa + poulet + crudités",
  "Pancakes avoine sans gluten + fruits rouges",
  "Tofu sauté + riz + légumes vapeur",
  "Bowl sarrasin + chèvre + poire"
];

const collations = [
  "Pomme + amandes",
  "Yaourt brebis + myrtilles",
  "Banane",
  "Compote sans sucre + noix",
  "Fruits rouges + lait amande",
  "Amandes + tisane",
  "Barre protéinée sans gluten"
];

const diners = [
  "Saumon + riz + brocoli",
  "Poulet + patate douce + haricots verts",
  "Crevettes wok + légumes + riz",
  "Dinde grillée + ratatouille + riz",
  "Cabillaud + lentilles corail + courgettes",
  "Tofu grillé + riz + légumes vapeur",
  "Truite + riz basmati + légumes verts"
];

let menu = [];

for (let i = 0; i < 7; i++) {
  menu.push({
    jour: `Jour ${i + 1}`,
    brunch: brunches[Math.floor(Math.random() * brunches.length)],
    collation: collations[Math.floor(Math.random() * collations.length)],
    diner: diners[Math.floor(Math.random() * diners.length)]
  });
}

fs.writeFileSync("data/menu.json", JSON.stringify(menu, null, 2), "utf8");
console.log("✅ menu.json généré");
