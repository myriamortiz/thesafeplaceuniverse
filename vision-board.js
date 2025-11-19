// ---------------------------------------------------------
// 🌷 Vision Board – Chargement du mot du mois & de l'affirmation
// ---------------------------------------------------------

// 🔮 Charger un fichier JSON et retourner un élément au hasard
async function chargerFichierJSON(url) {
  try {
    const res = await fetch(url + "?cache=" + Date.now());
    if (!res.ok) throw new Error("Fichier introuvable");
    const data = await res.json();
    return data[Math.floor(Math.random() * data.length)];
  } catch (e) {
    return "❌ Impossible de charger ce contenu.";
  }
}

// ---------------------------------------------------------
// 🌸 Charger le mot du mois
// ---------------------------------------------------------
async function chargerMotDuMois() {
  const motElem = document.getElementById("motMois");
  motElem.textContent = await chargerFichierJSON("data/mot-du-mois.json");
}

// ---------------------------------------------------------
// 💎 Charger l'affirmation du mois
// ---------------------------------------------------------
async function chargerAffirmation() {
  const citationElem = document.getElementById("citationMois");
  citationElem.textContent = await chargerFichierJSON("data/affirmations.json");
}

// ---------------------------------------------------------
// 📝 Sauvegarde automatique des intentions
// ---------------------------------------------------------
function initialiserIntentions() {
  const intentions = document.querySelectorAll(".intention");
  const saved = JSON.parse(localStorage.getItem("intentionsTB")) || [];

  intentions.forEach((input, i) => {
    input.value = saved[i] || "";
    input.addEventListener("input", () => {
      saved[i] = input.value;
      localStorage.setItem("intentionsTB", JSON.stringify(saved));
    });
  });
}

// ---------------------------------------------------------
// 🚀 Initialisation au chargement de la page
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  chargerMotDuMois();
  chargerAffirmation();
  initialiserIntentions();
});
