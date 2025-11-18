// ----- generate_sport.js -----

const fs = require("fs");

if (!fs.existsSync("data")) fs.mkdirSync("data");

// Séances définies automatiquement
const sessions = [
  {
    type: "Séance maison full body",
    details: "squats, pompes, planches, lunges"
  },
  {
    type: "Séance maison dos et bras",
    details: "tractions, extensions, rows, biceps"
  },
  {
    type: "Séance maison jambes",
    details: "squats, lunges, fentes, extensions"
  },
  {
    type: "Séance maison abdominaux",
    details: "planches, crunchs, Russian twists, leg raises"
  }
];

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

let sport = jours.map((j, i) => {
  // Séances pour lundi, mardi, jeudi, vendredi
  if (["Lundi", "Mardi", "Jeudi", "Vendredi"].includes(j)) {
    let index = i % sessions.length;
    return {
      jour: j,
      type: sessions[index].type,
      details: sessions[index].details
    };
  }

  // Repos actif
  return {
    jour: j,
    type: "Repos actif",
    details: j === "Dimanche"
      ? "yoga doux, étirements de base"
      : "marche de 30 minutes, stretching doux"
  };
});

fs.writeFileSync("data/sport.json", JSON.stringify(sport, null, 2));
console.log("✅ sport.json généré avec succès !");
