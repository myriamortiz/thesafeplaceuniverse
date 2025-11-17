// Génère quelques recettes de base en lien avec les repas

const fs = require("fs");

// S'assure que le dossier data existe
if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}

const recettes = [
  {
    nom: "Salade quinoa & poulet",
    etapes: [
      "Cuire le quinoa dans de l'eau salée.",
      "Cuire le poulet à la poêle avec un peu d'huile d'olive.",
      "Mélanger quinoa, poulet, tomates, concombre, salade verte.",
      "Assaisonner avec huile d'olive, jus de citron, sel, poivre."
    ]
  },
  {
    nom: "Pâtes complètes aux légumes grillés",
    etapes: [
      "Cuire les pâtes complètes.",
      "Couper courgettes, poivrons, oignons et les faire griller au four ou à la poêle.",
      "Mélanger pâtes + légumes, ajouter un filet d'huile d'olive et des herbes."
    ]
  },
  {
    nom: "Saumon + riz complet + brocoli",
    etapes: [
      "Cuire le riz complet.",
      "Cuire le saumon au four ou à la poêle.",
      "Cuire le brocoli à la vapeur.",
      "Servir le tout avec un filet de citron."
    ]
  }
];

fs.writeFileSync("data/recettes.json", JSON.stringify(recettes, null, 2), "utf8");

console.log("✅ Recettes générées dans data/recettes.json");
