// Génère automatiquement un planning sport pour Safe Place

const fs = require("fs");

// S'assure que le dossier data existe
if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}

const sessions = [
  "Full body doux (45 min)",
  "Bas du corps + fessiers (45 min)",
  "Haut du corps + bras (40 min)",
  "Cardio doux + mobility (30 min)",
  "Core & gainage (30 min)"
];

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

const sportWeek = days.map((jour, index) => {
  if (["Lundi", "Mardi", "Jeudi", "Vendredi"].includes(jour)) {
    return {
      jour,
      exercice: sessions[index % sessions.length]
    };
  } else {
    return {
      jour,
      exercice: "Repos actif / marche / étirements légers"
    };
  }
});

fs.writeFileSync("data/sport.json", JSON.stringify(sportWeek, null, 2), "utf8");

console.log("✅ Programme sport généré dans data/sport.json");
