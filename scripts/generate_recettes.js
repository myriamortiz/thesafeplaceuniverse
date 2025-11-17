import fs from "fs";
import path from "path";

const recettes = [
  {
    titre: "Salade quinoa & poulet",
    ingredients: [
      "120 g de quinoa",
      "1 blanc de poulet grillé",
      "1/2 avocat",
      "1 poignée de tomates cerises",
      "1 cuillère à café d’huile d’olive",
      "Sel, poivre, citron"
    ],
    instructions: 
      "1. Cuire le quinoa selon les indications.\n" +
      "2. Griller le poulet puis le couper en lamelles.\n" +
      "3. Mélanger quinoa, poulet, avocat et tomates.\n" +
      "4. Assaisonner avec huile d’olive, citron, sel et poivre."
  },
  {
    titre: "Pâtes complètes aux légumes grillés",
    ingredients: [
      "120 g de pâtes complètes",
      "1 courgette",
      "1 poivron",
      "1 oignon",
      "1 cuillère à café d’huile d’olive",
      "Sel, ail, herbes aromatiques"
    ],
    instructions:
      "1. Cuire les pâtes.\n" +
      "2. Couper les légumes et les faire griller à la poêle.\n" +
      "3. Mélanger pâtes + légumes.\n" +
      "4. Assaisonner avec ail, sel et herbes."
  },
  {
    titre: "Saumon + riz complet + brocoli",
    ingredients: [
      "1 pavé de saumon",
      "120 g de riz complet",
      "1 bol de brocoli",
      "1 cuillère à café d’huile d’olive",
      "Citron, sel, poivre"
    ],
    instructions:
      "1. Cuire le riz.\n" +
      "2. Cuire le saumon au four 12 min à 180°C.\n" +
      "3. Cuire le brocoli à la vapeur.\n" +
      "4. Servir avec un filet de citron."
  },
  {
    titre: "Buddha Bowl veggie",
    ingredients: [
      "80 g de pois chiches",
      "1 petite patate douce",
      "1 poignée d'épinards",
      "1/2 avocat",
      "Graines de sésame",
      "Huile d’olive, sel, poivre"
    ],
    instructions:
      "1. Rôtir la patate douce au four 20 min.\n" +
      "2. Réchauffer les pois chiches.\n" +
      "3. Composer le bol avec épinards + avocat.\n" +
      "4. Ajouter sésame et assaisonnement."
  },
  {
    titre: "Wok de crevettes & légumes",
    ingredients: [
      "150 g de crevettes",
      "Carottes, poivrons, brocoli",
      "1 cuillère à soupe de sauce soja",
      "1 cuillère à café d’huile",
      "Ail, gingembre"
    ],
    instructions:
      "1. Faire revenir les crevettes.\n" +
      "2. Ajouter les légumes coupés.\n" +
      "3. Ajouter la sauce soja + ail + gingembre."
  }
];

const outPath = path.join("data", "recettes.json");

fs.writeFileSync(outPath, JSON.stringify(recettes, null, 2), "utf-8");

console.log("Recettes de la semaine générées !");
