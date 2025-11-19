// sport.js — version cyclique (4 semaines)

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sport-container");

  fetch("data/sport.json?cache=" + Date.now())
    .then(r => r.json())
    .then(data => {

      // ⭐ Détermine numéro de la semaine
      const today = new Date();
      const weekNumber = Math.ceil(today.getDate() / 7); // 1 → 4
      const semaineKey = "semaine" + Math.min(weekNumber, 4);

      const semaine = data[semaineKey];

      container.innerHTML = "";

      semaine.forEach(day => {
        const div = document.createElement("div");
        div.className = "sport-day-card";

        div.innerHTML = `
          <h3>${day.jour}</h3>
          <p><strong>${day.type}</strong></p>
          <p>${day.details}</p>
        `;

        container.appendChild(div);
      });
    })
    .catch(() => {
      container.innerHTML = "<p>Impossible de charger ton planning sport 🌧</p>";
    });
});
