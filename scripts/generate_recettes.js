// ----- generate_recettes.js -----

const fs = require("fs");

// S'assurer que le dossier data existe
if (!fs.existsSync("data")) fs.mkdirSync("data");

// Base de recettes : 100% sans blé, sans lactose (ou versions brebis/chèvre / végétal)
// Pensées pour une journée ~1400 kcal avec jeûne 17:7 (2 repas + 1 collation)

// 🔹 BRUNCH
const recettesBase = {
  "Omelette + avocat + patate douce": {
    ingredients: [
      "2 œufs",
      "1/2 avocat",
      "100 g patate douce",
      "1 c.à.c huile d’olive",
      "sel",
      "poivre"
    ],
    instructions:
      "Éplucher et couper la patate douce en dés, les rôtir au four ou à la poêle avec un peu d’huile d’olive. Battre les œufs, les cuire en omelette. Servir l’omelette avec la patate douce rôtie et l’avocat en tranches."
  },

  "Galettes sarrasin + œuf + chèvre": {
    ingredients: [
      "2 galettes de sarrasin sans blé",
      "1 œuf",
      "30 g fromage de chèvre",
      "1 poignée de roquette",
      "poivre"
    ],
    instructions:
      "Faire chauffer une galette dans une poêle, déposer l’œuf au plat et le fromage de chèvre émietté. Ajouter la roquette au moment de servir, poivrer."
  },

  "Smoothie bowl coco + granola sans gluten": {
    ingredients: [
      "150 ml boisson végétale coco",
      "1 banane",
      "50 g fruits rouges",
      "2 c.à.s granola sans gluten",
      "1 c.à.c graines de chia"
    ],
    instructions:
      "Mixer la boisson coco, la banane et les fruits rouges. Verser dans un bol et ajouter le granola et les graines de chia sur le dessus."
  },

  "Bowl quinoa + poulet + crudités": {
    ingredients: [
      "60 g quinoa cru",
      "80 g filet de poulet",
      "1/2 avocat",
      "1/2 carotte râpée",
      "quelques tomates cerises",
      "1 c.à.c huile d’olive",
      "jus de citron",
      "sel",
      "poivre"
    ],
    instructions:
      "Cuire le quinoa. Cuire le poulet à la poêle puis le couper en lamelles. Disposer quinoa, poulet, avocat, carotte et tomates dans un bol. Arroser d’huile d’olive, citron, saler, poivrer."
  },

  "Pancakes avoine sans gluten + fruits rouges": {
    ingredients: [
      "40 g flocons d’avoine certifiés sans gluten",
      "1 œuf",
      "70 ml boisson végétale (amande ou avoine sans gluten)",
      "1/2 c.à.c levure",
      "50 g fruits rouges",
      "1 c.à.c sirop d’érable (optionnel)"
    ],
    instructions:
      "Mixer tous les ingrédients sauf les fruits rouges. Cuire des petits pancakes dans une poêle anti-adhésive. Servir avec les fruits rouges et un peu de sirop d’érable si souhaité."
  },

  "Tofu sauté + riz + légumes vapeur": {
    ingredients: [
      "80 g tofu nature",
      "60 g riz basmati ou complet",
      "brocoli ou haricots verts (une petite portion)",
      "1 c.à.s sauce soja sans gluten",
      "1 c.à.c huile d’olive ou sésame"
    ],
    instructions:
      "Cuire le riz. Faire revenir le tofu en dés avec l’huile et la sauce soja. Cuire les légumes à la vapeur. Servir le tout dans un bol."
  },

  "Bowl sarrasin + chèvre + poire": {
    ingredients: [
      "50 g flocons de sarrasin",
      "150 ml boisson végétale",
      "1/2 poire",
      "20 g fromage de chèvre frais",
      "1 c.à.c noix ou amandes"
    ],
    instructions:
      "Cuire rapidement les flocons de sarrasin dans la boisson végétale pour faire une sorte de porridge. Servir avec la poire en lamelles, le chèvre émietté et les noix."
  },

  // 🔹 COLLATIONS
  "Pomme + amandes": {
    ingredients: ["1 pomme", "10 amandes"],
    instructions:
      "Couper la pomme en quartiers, déguster avec les amandes."
  },

  "Yaourt brebis + myrtilles": {
    ingredients: ["1 yaourt au lait de brebis nature", "1 petite poignée de myrtilles"],
    instructions:
      "Verser les myrtilles sur le yaourt, mélanger si souhaité."
  },

  "Banane": {
    ingredients: ["1 banane"],
    instructions: "Éplucher et déguster simplement."
  },

  "Compote sans sucre + noix": {
    ingredients: ["1 petite compote sans sucres ajoutés", "5 noix"],
    instructions:
      "Déguster la compote avec les noix entières ou concassées."
  },

  "Fruits rouges + lait amande": {
    ingredients: ["100 g fruits rouges", "150 ml boisson amande"],
    instructions:
      "Servir les fruits rouges dans un bol, boire la boisson amande à côté ou verser dessus."
  },

  "Amandes + tisane": {
    ingredients: ["10 amandes", "1 tasse de tisane"],
    instructions:
      "Grignoter les amandes tranquillement pendant que tu bois ta tisane."
  },

  "Barre protéinée sans gluten": {
    ingredients: ["1 barre protéinée sans gluten (lecture étiquette)"],
    instructions:
      "Choisir une barre avec peu de sucres ajoutés et compatible sans gluten."
  },

  // 🔹 DINERS
  "Saumon + riz + brocoli": {
    ingredients: [
      "100 g pavé de saumon",
      "60 g riz",
      "brocoli (une petite portion)",
      "jus de citron",
      "sel",
      "poivre"
    ],
    instructions:
      "Cuire le riz. Cuire le saumon au four ou à la poêle. Cuire le brocoli à la vapeur. Servir avec citron, sel et poivre."
  },

  "Poulet + patate douce + haricots verts": {
    ingredients: [
      "100 g filet de poulet",
      "150 g patate douce",
      "une poignée de haricots verts",
      "1 c.à.c huile d’olive",
      "sel",
      "poivre",
      "paprika ou herbes"
    ],
    instructions:
      "Rôtir la patate douce en dés au four. Cuire les haricots verts à la vapeur. Cuire le poulet à la poêle avec un peu d’huile et d’épices. Servir le tout ensemble."
  },

  "Crevettes wok + légumes + riz": {
    ingredients: [
      "100 g crevettes",
      "60 g riz",
      "légumes pour wok (poivrons, carottes, courgettes…)",
      "1 c.à.s sauce soja sans gluten"
    ],
    instructions:
      "Cuire le riz. Faire revenir les légumes puis ajouter les crevettes et la sauce soja. Servir avec le riz."
  },

  "Dinde grillée + ratatouille + riz": {
    ingredients: [
      "100 g escalope de dinde",
      "1 portion de ratatouille maison ou sans sucre ajouté",
      "50–60 g riz"
    ],
    instructions:
      "Cuire le riz. Griller l’escalope de dinde à la poêle. Réchauffer ou cuire la ratatouille. Servir ensemble."
  },

  "Cabillaud + lentilles corail + courgettes": {
    ingredients: [
      "100 g cabillaud",
      "60 g lentilles corail",
      "1 petite courgette",
      "1 c.à.c huile d’olive",
      "sel",
      "poivre"
    ],
    instructions:
      "Cuire les lentilles corail. Cuire le cabillaud à la poêle ou au four. Faire revenir les courgettes en dés avec un peu d’huile. Servir le tout dans une assiette."
  },

  "Tofu grillé + riz + légumes vapeur": {
    ingredients: [
      "100 g tofu ferme",
      "60 g riz",
      "légumes (brocoli, carottes, haricots verts…)",
      "1 c.à.s sauce soja sans gluten"
    ],
    instructions:
      "Cuire le riz. Griller le tofu en dés dans une poêle avec la sauce soja. Cuire les légumes à la vapeur. Servir ensemble."
  },

  "Truite + riz basmati + légumes verts": {
    ingredients: [
      "100 g filet de truite",
      "60 g riz basmati",
      "légumes verts (haricots, brocoli, épinards…)",
      "jus de citron",
      "sel",
      "poivre"
    ],
    instructions:
      "Cuire le riz basmati. Cuire la truite au four ou à la poêle. Cuire les légumes verts à la vapeur. Servir avec un filet de citron."
  }
};

// Lecture du menu généré
const menu = JSON.parse(fs.readFileSync("data/menu.json", "utf8"));

const recettes = menu.map(day => {
  const brunchBase = recettesBase[day.brunch];
  const collationBase = recettesBase[day.collation];
  const dinerBase = recettesBase[day.diner];

  const buildRecette = (label, base) => {
    if (!label) {
      return {
        titre: "Recette à définir",
        ingredients: ["Ingrédients à définir"],
        instructions: "Instructions à définir"
      };
    }
    if (!base) {
      // Sécurité : si un nouveau nom apparaît sans être encore dans la base
      return {
        titre: label,
        ingredients: ["Ingrédients à définir"],
        instructions: "Instructions à définir"
      };
    }
    return {
      titre: label,
      ingredients: base.ingredients,
      instructions: base.instructions
    };
  };

  return {
    jour: day.jour,
    brunch: buildRecette(day.brunch, brunchBase),
    collation: buildRecette(day.collation, collationBase),
    diner: buildRecette(day.diner, dinerBase)
  };
});

fs.writeFileSync("data/recettes.json", JSON.stringify(recettes, null, 2), "utf8");
console.log("✅ recettes.json généré avec 7 jours × brunch + collation + dîner");
