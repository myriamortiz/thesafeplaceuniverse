// Génère automatiquement un menu de la semaine pour Safe Place

const fs = require("fs");

// S'assure que le dossier data existe
if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}

// Liste de repas simples (on pourra personnaliser ensuite)
const meals = [
  "Salade quinoa & poulet",
  "Pâtes complètes aux légumes grillés",
  "Saumon + riz complet + brocoli",
  "Buddha bowl veggie",
  "Wrap thon & crudités",
  "Soupe de légumes & lentilles",
  "Poulet au four + patates douces"
];

const snacks = [
  "1 pomme",
  "Yaourt grec",
  "Amandes",
  "Fromage blanc",
  "Banane"
];

// Génération automatique du menu sur 7 jours
const menu = [];

for (let i = 0; i < 7; i++) {
  menu.push({
    jour: `Jour ${i + 1}`,
    repas: meals[Math.floor(Math.random() * meals.length)],
    collation: snacks[Math.floor(Math.random() * snacks.length)]
  });
}

// Écriture dans data/menu.json
fs.writeFileSync("data/menu.json", JSON.stringify(menu, null, 2), "utf8");

console.log("✅ Menu de la semaine généré dans data/menu.json");
