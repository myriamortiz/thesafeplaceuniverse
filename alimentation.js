// 🌸 Chargement automatique du menu depuis /data/menu.json

async function loadMenu() {
  const container = document.getElementById("weeklyPlan");
  if (!container) return;

  try {
    const response = await fetch("https://myriamortiz.github.io/thesafeplaceuniverse/data/menu.json?cache=" + Date.now());
    if (!response.ok) throw new Error("Impossible de charger le menu");

    const menu = await response.json();

    container.innerHTML = "";

    menu.forEach(day => {
      const card = document.createElement("div");
      card.className = "day-card";
      card.innerHTML = `
        <h3>🌸 ${day.jour}</h3>
        <p><strong>Repas :</strong> ${day.repas}</p>
        <p><strong>Collation :</strong> ${day.collation}</p>
      `;
      container.appendChild(card);
    });
  } catch (e) {
    document.getElementById("weeklyPlan").innerHTML =
      "<p style='text-align:center;'>❄️ Impossible de charger ton plan alimentaire</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadMenu);
