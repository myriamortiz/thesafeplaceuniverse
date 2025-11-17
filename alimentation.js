// 🍱 SAFE PLACE – VERSION TABLEAU HARMONIEUX

document.addEventListener("DOMContentLoaded", () => {
  const mealBody = document.getElementById("mealBody");
  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  // Créer les lignes du tableau
  days.forEach(day => {
    const row = document.createElement("tr");

    const dayCell = document.createElement("td");
    dayCell.textContent = day;
    row.appendChild(dayCell);

    ["Déjeuner", "Dîner", "Collation"].forEach(meal => {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = `Ton ${meal.toLowerCase()}...`;
      input.id = `${day}-${meal}`;
      input.classList.add("meal-input");

      // Charger les données sauvegardées
      const saved = localStorage.getItem(input.id);
      if (saved) input.value = saved;

      // Sauvegarde automatique
      input.addEventListener("input", () => {
        localStorage.setItem(input.id, input.value);
      });

      cell.appendChild(input);
      row.appendChild(cell);
    });

    mealBody.appendChild(row);
  });

  // Citation motivante
  const quotes = [
    "Je mange pour nourrir ma lumière, pas pour combler un vide.",
    "Mon corps mérite douceur et équilibre.",
    "Chaque repas est une promesse de bienveillance envers moi-même.",
    "Je transforme la discipline en douceur quotidienne.",
    "Manger lentement, c’est honorer mon corps et mes besoins."
  ];
  const quoteEl = document.getElementById("foodQuote");
  quoteEl.textContent = `“${quotes[Math.floor(Math.random() * quotes.length)]}” 🌷`;

  // Ressenti
  const mood = document.getElementById("foodMood");
  const saveMood = document.getElementById("saveMood");
  const moodMsg = document.getElementById("moodMsg");

  if (localStorage.getItem("foodMood")) mood.value = localStorage.getItem("foodMood");

  saveMood.addEventListener("click", () => {
    localStorage.setItem("foodMood", mood.value);
    moodMsg.style.display = "block";
    setTimeout(() => (moodMsg.style.display = "none"), 2000);
  });
});
