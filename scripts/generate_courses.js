// Génère une liste de courses simple basée sur les repas "type"

const fs = require("fs");

// S'assure que le dossier data existe
if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}

// Liste de base – on pourra la rendre plus intelligente plus tard
const courses = [
  "Quinoa",
  "Riz complet",
  "Pâtes complètes",
  "Poulet",
  "Saumon",
  "Thon en boîte",
  "Lentilles",
  "Patates douces",
  "Brocoli",
  "Carottes",
  "Tomates",
  "Salade verte / roquette",
  "Concombre",
  "Poivrons",
  "Oignons",
  "Yaourt grec",
  "Fromage blanc",
  "Fruits (pommes, bananes)",
  "Amandes / oléagineux",
  "Huile d'olive",
  "Épices (paprika, curry, herbes de Provence)"
];

fs.writeFileSync("data/courses.json", JSON.stringify(courses, null, 2), "utf8");

console.log("✅ Liste de courses générée dans data/courses.json");
