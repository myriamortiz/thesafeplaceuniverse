// 🌸 SAFE PLACE UNIVERSE – DYNAMIQUE & INTERACTIF

// --- CITATIONS DU JOUR ---
const quotes = [
  "Je me choisis, encore et encore, jusqu’à ce que cela devienne naturel.",
  "Je ne suis pas en retard, je suis en chemin.",
  "Mon énergie attire ce que je mérite.",
  "Aujourd’hui, je décide d’être douce avec moi-même.",
  "Je suis fière de mes progrès, même silencieux.",
  "Chaque petit pas compte vers ma lumière.",
  "Je crée ma paix, une respiration à la fois."
];
document.addEventListener("DOMContentLoaded", () => {
  const quoteEl = document.getElementById("quote");
  if (quoteEl) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = randomQuote;
  }

  // --- SAUVEGARDE DE L’HUMEUR & GRATITUDE ---
  const moodInput = document.getElementById("mood");
  const gratitudeInput = document.getElementById("gratitude");
  const saveButton = document.getElementById("saveData");
  const saveMsg = document.getElementById("saveMsg");

  // Charger les données précédentes
  if (localStorage.getItem("mood")) moodInput.value = localStorage.getItem("mood");
  if (localStorage.getItem("gratitude")) gratitudeInput.value = localStorage.getItem("gratitude");

  saveButton.addEventListener("click", () => {
    localStorage.setItem("mood", moodInput.value);
    localStorage.setItem("gratitude", gratitudeInput.value);
    saveMsg.style.display = "block";
    setTimeout(() => saveMsg.style.display = "none", 2000);
  });

  // --- CHECKLIST RITUELS ---
  const checkboxes = document.querySelectorAll(".checklist input[type='checkbox']");
  checkboxes.forEach(box => {
    const saved = localStorage.getItem(box.id);
    box.checked = saved === "true";
    box.addEventListener("change", () => {
      localStorage.setItem(box.id, box.checked);
    });
  });
});
