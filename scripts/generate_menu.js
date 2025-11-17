// Génération automatique d’un menu simple pour Safe Place

const fs = require("fs");

// Liste de repas simples — tu pourras me demander de les personnaliser
const meals = [
  "Salade quinoa & poulet",
  "Pâtes complètes légumes grillés",
  "Saumon + riz + brocoli",
  "Buddha bowl veggie",
  "Wrap thon & crudités",
  "Soupe légumes & lentilles",
  "Poulet au four + patates douces"
];

const snacks = [
  "1 pomme",
  "Yaourt grec",
  "Amandes",
  "Fromage blanc",
  "Banane"
];

// Génération automatique
const menu = [];

for (let i = 0; i < 7; i++) {
  menu.push({
    jour: `Jour ${i + 1}`,
    repas: meals[Math.floor(Math.random() * meals.length)],
    collation: snacks[Math.floor(Math.random() * snacks.length)]
  });
}

// Conversion en HTML (ton app lit du HTML)
let html = `<h2>Menu de la semaine</h2>`;
menu.forEach((m) => {
  html += `<p><strong>${m.jour}</strong><br>Repas : ${m.repas}<br>Collation : ${m.collation}</p>`;
});

// Écriture dans ton fichier `alimentation.html`
fs.writeFileSync("alimentation.html", html, "utf8");

console.log("Menu généré ✔️");
