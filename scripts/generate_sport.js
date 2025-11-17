// ----- generate_sport.js -----

const fs = require("fs");

if (!fs.existsSync("data")) fs.mkdirSync("data");

const sessions = [
  "Full body (45 min)",
  "Bas du corps + fessiers (45 min)",
  "Haut du corps + bras (40 min)",
  "Cardio doux + mobilité (30 min)"
];

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

let sport = jours.map((j, i) => {
  if (["Lundi", "Mardi", "Jeudi", "Vendredi"].includes(j)) {
    return { jour: j, exercice: sessions[i % sessions.length] };
  }
  return { jour: j, exercice: "Repos actif / marche / étirements" };
});

fs.writeFileSync("data/sport.json", JSON.stringify(sport, null, 2));
console.log("✅ sport.json généré");
