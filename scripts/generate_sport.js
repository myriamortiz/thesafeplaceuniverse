// ----- generate_sport.js -----

const fs = require("fs");

if (!fs.existsSync("data")) fs.mkdirSync("data");

const fullBody = [
  "Squats — 40 sec",
  "Pompes — 40 sec",
  "Fentes alternées — 40 sec",
  "Planche — 40 sec",
  "Hip Thrust — 40 sec",
];

const upper = [
  "Row élastique — 15 reps",
  "Élévations latérales — 12 reps",
  "Curl biceps — 15 reps",
  "Extensions triceps — 12 reps",
  "Pompes murales — 12 reps"
];

const lower = [
  "Squats — 15 reps",
  "Kickbacks élastique — 15 reps/jambe",
  "Hip Thrust — 20 reps",
  "Fentes arrière — 12 reps/jambe",
  "Abduction élastique — 20 reps"
];

const abs = [
  "Crunchs — 15 reps",
  "Planche — 30 sec",
  "Relevés de jambes — 12 reps",
  "Russian twists — 20 reps",
  "Planche latérale — 20 sec/côté"
];

const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());

// --- Construction du programme ---
const sport = [
  {
    jour: "Lundi",
    type: "Full Body — 3 tours (40\" / 20\")",
    details: [...shuffle(fullBody), "⏳ Repos : 1 min entre chaque tour"]
  },
  {
    jour: "Mardi",
    type: "Haut du corps — 3 séries",
    details: [...shuffle(upper), "⏳ Repos : 1 min entre les séries"]
  },
  {
    jour: "Mercredi",
    type: "Bachata",
    details: ["Cours + rythme", "Pas de base", "Impro 5 min"]
  },
  {
    jour: "Jeudi",
    type: "Bas du corps — 3 séries",
    details: [...shuffle(lower), "🔥 Finisher : pont fessier — 45 sec"]
  },
  {
    jour: "Vendredi",
    type: "Abdos — 3 tours",
    details: [...shuffle(abs), "⏳ Repos : 45 sec entre les tours"]
  },
  {
    jour: "Samedi",
    type: "Repos actif",
    details: ["Marche 30 min", "Stretching doux"]
  },
  {
    jour: "Dimanche",
    type: "Repos actif",
    details: ["Yoga doux 10 min", "Étirements"]
  }
];

fs.writeFileSync("data/sport.json", JSON.stringify(sport, null, 2));
console.log("✅ sport.json généré automatiquement !");
