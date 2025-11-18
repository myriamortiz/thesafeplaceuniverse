async function loadRecettes() {
  const container = document.getElementById("recettes-container");

  try {
    const response = await fetch("data/recettes.json?cache=" + Date.now());
    const recettes = await response.json();

    container.innerHTML = "";

    recettes.forEach(day => {
      container.innerHTML += `
        <div class="day-card">
          <h2>🌸 ${day.jour}</h2>

          <h3>${day.brunch.titre}</h3>
          <ul>${day.brunch.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
          <p>${day.brunch.instructions}</p>

          <h3>${day.collation.titre}</h3>
          <ul>${day.collation.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
          <p>${day.collation.instructions}</p>

          <h3>${day.diner.titre}</h3>
          <ul>${day.diner.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
          <p>${day.diner.instructions}</p>
        </div>
      `;
    });
  } catch (e) {
    container.innerHTML = "<p>Impossible de charger les recettes 🌧️</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadRecettes);
