// mindset.js 🌸 – Gestion des champs + affirmation automatique
document.addEventListener("DOMContentLoaded", () => {
  const fields = [
    "ressenti", "poids", "appris",
    "grat1", "grat2", "grat3",
    "victoire", "motcle", "intention",
    "obj1", "obj2", "obj3", "note"
  ];

  fields.forEach(id => {
    const el = document.getElementById(id);
    const saved = localStorage.getItem(id);
    if (saved && el) el.value = saved;

    el?.addEventListener("input", () => {
      localStorage.setItem(id, el.value);
      showMsg();
    });
  });

  // 💎 Affirmations automatiques
  const affirmations = [
    "Je ne suis pas en retard sur ma vie. Je chemine à mon rythme, et c’est déjà magnifique.",
    "Je me traite avec la douceur que j’aurais aimé recevoir.",
    "Chaque jour, je deviens un peu plus moi-même.",
    "Je suis en sécurité dans mon propre rythme.",
    "Je mérite la paix, même quand le monde va vite.",
    "Je m’autorise à briller sans me comparer.",
    "Je peux être fière de la personne que je deviens."
  ];

  const affirmKey = "affirmationWeek";
  const affirmIndexKey = "affirmationIndex";
  const affirmText = document.getElementById("affirmationText");

  const lastUpdate = localStorage.getItem(affirmKey);
  const diffDays = lastUpdate ? (new Date() - new Date(lastUpdate)) / (1000 * 60 * 60 * 24) : 8;

  if (diffDays >= 7 || !lastUpdate) {
    const index = parseInt(localStorage.getItem(affirmIndexKey) || "0", 10);
    const nextIndex = (index + 1) % affirmations.length;
    localStorage.setItem(affirmationText, affirmations[nextIndex]);
    localStorage.setItem(affirmIndexKey, nextIndex);
    localStorage.setItem(affirmKey, new Date().toISOString());
    affirmText.textContent = affirmations[nextIndex];
  } else {
    const index = parseInt(localStorage.getItem(affirmIndexKey) || "0", 10);
    affirmText.textContent = affirmations[index];
  }

  // 🌸 Message de sauvegarde
  function showMsg() {
    const msg = document.getElementById("noteMsg");
    msg.style.display = "block";
    msg.style.opacity = "1";
    setTimeout(() => {
      msg.style.opacity = "0";
      setTimeout(() => (msg.style.display = "none"), 400);
    }, 1500);
  }
});
