async function loadSport() {
  const container = document.getElementById("sportPlan");
  if (!container) return;

  try {
    const response = await fetch("data/sport.json?cache=" + Date.now());
    if (!response.ok) throw new Error("Erreur");

    const data = await response.json();
    container.innerHTML = "";

    data.forEach(day => {
      const div = document.createElement("div");
      div.className = "sport-card";

      const label = day.type || day.exercice || "Séance";
      const details = day.details || "";

      div.innerHTML = `
        <h3>🔥 ${day.jour}</h3>
        <p><strong>${label}</strong></p>
        ${details ? `<p>${details}</p>` : ""}
      `;

      container.appendChild(div);
    });

  } catch (e) {
    container.innerHTML = "<p style='text-align:center;'>💤 Impossible de charger ton planning sport</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadSport);
