import fs from "fs";

// -----------------------------
//  Recettes brunch
// -----------------------------
const brunchList = [
  {
    titre: "Omelette épinards & brebis",
    kcal: 380,
    ingredients: [
      "2 œufs",
      "1 poignée d'épinards",
      "20 g fromage de brebis",
      "1 c. café huile d'olive"
    ],
    instructions:
      "1. Battre les œufs. 2. Cuire avec épinards. 3. Ajouter brebis en fin."
  },
  {
    titre: "Porridge flocons sans gluten & lait amande",
    kcal: 400,
    ingredients: [
      "50 g flocons sans gluten",
      "200 ml lait d’amande",
      "1/2 banane",
      "Cannelle"
    ],
    instructions:
      "1. Chauffer lait + flocons. 2. Ajouter banane et cannelle."
  },
  {
    titre: "Tartines sarrasin avocat & œuf",
    kcal: 420,
    ingredients: [
      "2 tartines sarrasin",
      "1/2 avocat",
      "1 œuf",
      "Citron"
    ],
    instructions:
      "1. Griller tartines. 2. Ajouter avocat. 3. Cuire œuf au plat."
  },
  {
    titre: "Smoothie bowl fruits rouges coco",
    kcal: 350,
    ingredients: [
      "150 g fruits rouges",
      "100 ml lait coco",
      "Granola sans gluten"
    ],
    instructions:
      "1. Mixer fruits + lait. 2. Servir avec granola."
  }
];

// -----------------------------
//  Recettes collation
// -----------------------------
const snacksList = [
  {
    titre: "Pomme + amandes",
    kcal: 150,
    ingredients: ["1 pomme", "10 amandes"],
    instructions: "Prêt immédiatement."
  },
  {
    titre: "Yaourt végétal coco + miel",
    kcal: 160,
    ingredients: ["1 yaourt coco", "1 c. café miel"],
    instructions: "Mélanger et déguster."
  },
  {
    titre: "Banane + beurre d’amande",
    kcal: 180,
    ingredients: ["1 banane", "1 c. café beurre d’amande"],
    instructions: "Simple et rapide."
  },
  {
    titre: "Fruits rouges + graines chia",
    kcal: 140,
    ingredients: ["100 g fruits rouges", "1 c. café graines de chia"],
    instructions: "Mélanger ensemble."
  }
];

// -----------------------------
//  Recettes dîner
// -----------------------------
const dinnerList = [
  {
    titre: "Poulet grillé + patate douce + brocoli",
    kcal: 480,
    ingredients: ["1 blanc de poulet", "1 patate douce", "Brocoli vapeur"],
    instructions:
      "1. Cuire patate douce. 2. Griller poulet. 3. Ajouter brocoli vapeur."
  },
  {
    titre: "Saumon + riz complet + brocoli",
    kcal: 480,
    ingredients: ["1 saumon", "120 g riz complet", "Brocoli"],
    instructions:
      "1. Cuire riz. 2. Cuire saumon. 3. Cuire brocoli."
  },
  {
    titre: "Curry coco pois chiches",
    kcal: 430,
    ingredients: ["Pois chiches", "Lait coco", "Courgette", "Curry"],
    instructions:
      "Faire mijoter ensemble 10 min."
  },
  {
    titre: "Wok crevettes & légumes",
    kcal: 390,
    ingredients: ["Crevettes", "Carottes", "Poivrons", "Sauce soja SG"],
    instructions:
      "Faire revenir le tout dans un wok."
  },
  {
    titre: "Pâtes sans gluten + légumes grillés",
    kcal: 410,
    ingredients: ["Pâtes SG", "Courgette", "Poivron", "Herbes"],
    instructions:
      "Cuire pâtes + griller légumes."
  },
  {
    titre: "Chili light dinde",
    kcal: 450,
    ingredients: ["Dinde hachée", "Haricots rouges", "Oignons", "Épices"],
    instructions:
      "Faire mijoter 15 min."
  }
];

// -----------------------------
//  Création du menu 7 jours
// -----------------------------
const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const semaine = jours.map(jour => ({
  jour,
  brunch: pickRandom(brunchList),
  collation: pickRandom(snacksList),
  diner: pickRandom(dinnerList)
}));

// -----------------------------
// Écriture du fichier
// -----------------------------
fs.writeFileSync("data/recettes.json", JSON.stringify(semaine, null, 2), "utf8");

console.log("🌸 Recettes complètes générées pour 7 jours (21 recettes) !");
