// vision-board.js 🌸 – Vision Board automatique par mois
document.addEventListener("DOMContentLoaded", () => {
  const mois = new Date().getMonth();

  const mots = [
    "Renouveau 🌱", "Création 🎨", "Éclosion 🌸", "Expansion ☀️",
    "Douceur 🌷", "Énergie 🌿", "Ancrage 🌻", "Harmonie 🌙",
    "Clarté 💎", "Alignement 🌾", "Gratitude 💖", "Sérénité 🕯"
  ];

  const citations = [
    "“Je m’ouvre aux possibilités infinies de ce nouveau mois.”",
    "“Je fais de la douceur ma force et de la patience ma magie.”",
    "“Ce mois-ci, je m’épanouis comme une fleur au soleil.”",
    "“Je choisis la paix, même au milieu du mouvement.”",
    "“Chaque jour, j’avance avec foi et douceur.”",
    "“Je deviens celle que j’ai toujours voulu être.”",
    "“Je transforme le simple en sacré.”",
    "“Mon énergie attire ce qui est fait pour moi.”",
    "“Je me réinvente avec amour.”",
    "“Je m’accorde le droit d’être lumineuse.”",
    "“Je laisse aller, je laisse venir.”",
    "“Je m’ancre dans la gratitude et la sérénité.”"
  ];

  // 🌸 Affiche automatiquement le mot et la citation selon le mois
  document.getElementById("motMois").textContent = mots[mois];
  document.getElementById("citationMois").textContent = citations[mois];

  // 💖 Sauvegarde automatique des rêves & intentions
  const fields = ["rev1", "rev2", "rev3", "rev4"];
  fields.forEach(id => {
    const el = document.getElementById(id);
    const saved = localStorage.getItem(id);
    if (saved && el) el.value = saved;

    el?.addEventListener("input", () => {
      localStorage.setItem(id, el.value);
    });
  });

  // 🌙 Réinitialisation automatique chaque mois
  const lastMonthKey = "visionLastMonth";
  const lastMonth = localStorage.getItem(lastMonthKey);
  const currentMonth = new Date().getMonth();

  if (lastMonth === null || parseInt(lastMonth) !== currentMonth) {
    fields.forEach(id => localStorage.removeItem(id));
    localStorage.setItem(lastMonthKey, currentMonth);
  }
});
