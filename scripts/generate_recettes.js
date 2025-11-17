import fs from "fs";
import path from "path";

// --- Recettes compatibles Myriam --- //
const RECIPES = [
  {
    titre: "Bowl quinoa + poulet citronné",
    kcal: 430,
    glutenFree: true,
    dairyFree: true,
    ingredients: [
      "120 g de quinoa",
      "1 blanc de poulet",
      "1/2 avocat",
      "1 poignée de roquette",
      "Jus de citron",
      "1 c. café huile d’olive",
      "Sel, poivre"
    ],
    instructions:
      "1. Cuire le quinoa.\n2. Griller le poulet.\n3. Mélanger quinoa + poulet + avocat.\n4. Assaisonner citron + huile d’olive."
  },
  {
    titre: "Saumon + riz complet + brocoli vapeur",
    kcal: 480,
    glutenFree: true,
    dairyFree: true,
    ingredients: [
      "1 pavé de saumon",
      "120 g de riz complet",
      "1 bol de brocoli",
      "Citron, sel, poivre"
    ],
    instructions:
      "1. Cuire le riz.\n2. Cuire le saumon au four 12 min.\n3. Cuire le brocoli vapeur."
  },
  {
    titre: "Curry coco veggie rapide",
    kcal: 400,
    glutenFree: true,
    dairyFree: true,
    ingredients: [
      "1 courgette",
      "1 carotte",
      "1/2 boîte pois chiches",
      "100 ml lait de coco",
      "1 c. café pâte curry",
      "Sel"
    ],
    instructions:
      "1. Faire revenir les légumes.\n2. Ajouter pois chiches + coco + curry.\n3. Servir chaud."
  },
  {
    titre: "Wok crevettes + légumes",
    kcal: 390,
    glutenFree: true,
    dairyFree: true,
    ingredients: [
      "150 g de crevettes",
      "Carottes, poivrons, brocoli",
      "1 c. soupe sauce soja sans gluten",
      "Ail, gingembre"
    ],
    instructions:
      "1. Faire sauter les crevettes.\n2. Ajouter légumes et assaisonnement."
  },
  {
    titre: "Buddha bowl patate douce & pois chiches",
    kcal: 410,
    glutenFree: true,
    dairyFree: true,
    ingredients: [
      "1 petite patate douce",
      "80 g pois chiches",
      "Épinards",
      "1/2 avocat",
      "Sésame",
      "Citron"
    ],
    instructions:
      "1. Rôtir la patate douce.\n2. Réchauffer les pois chiches.\n3. Composer le bol + citron."
  },
  {
    titre: "Pâtes sans gluten + légumes grillés",
    kcal: 430,
    glutenFree: true,
    dairyFree: true,
    ingredients: [
      "120 g pâtes sans gluten (riz/maïs/lentilles)",
      "1 courgette",
      "1 poivron",
      "Huile d’olive",
      "Ail, herbes"
    ],
    instructions:
      "1. Cuire les pâtes.\n2. Griller les légumes.\n3. Mélanger et assaisonner."
  },
  {
    titre: "Poulet miel & moutarde + légumes",
    kcal: 450,
    glutenFree: true,
    dairyFree: true,
    ingredients: [
      "1 blanc de poulet",
      "1 c. café miel",
      "1 c. café moutarde",
      "Courgette, carottes"
    ],
    instructions:
      "1. Mélanger miel + moutarde.\n2. Cuire le poulet.\n3. Ajouter légumes."
  }
];

// --- Génération aléatoire --- //
function pickRandomRecipes(count) {
  const selected = [];
  const pool = [...RECIPES];

  while (selected.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    selected.push(pool[index]);
    pool.splice(index, 1);
  }
  return selected;
}

const output = pickRandomRecipes(5);

const outPath = path.join("data", "recettes.json");

fs.writeFileSync(outPath, JSON.stringif
