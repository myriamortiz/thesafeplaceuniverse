document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("sport-container");

  try {
    const response = await fetch("data/sport.json?cache=" + Date.now());
    const data = await response.json();

    container.innerHTML = "";

    data.forEach(day => {
      const div = document.createElement("div");
      div.className = "day-card";

      const list = day.details
        .map(i => `<li>${i}</li>`)
        .join("");

      div.innerHTML = `
        <h3>${day.jour}</h3>
        <p><strong>${day.type}</strong></p>
        <ul>${list}</ul>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    container.innerHTML = "<p>🌧 Impossible de charger le planning sport.</p>";
  }
});
