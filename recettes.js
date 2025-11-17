
// 🌸 Chargement auto depuis data/recettes.json

async function loadRecettes() {
  const container = document.getElementById("recettesList");
  if (!container) return;

  try {
    const response = await fetch("data/recettes.json?cache=" + Date.now());

    );

    if (!response.ok) throw new Error("Erreur");

    const recettes = await response.json();
    container.innerHTML = "";

    recettes.forEach(item => {
      const block = document.createElement("div");
      block.className = "recette-card";
      block.innerHTML = `
        <h3>${item.nom}</h3>
        <p>${item.details}</p>
      `;
      container.appendChild(block);
    });
  } catch (e) {
    container.innerHTML = "<p style='text-align:center;'>🍃 Impossible de charger les recettes</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadRecettes);
