function getCurrentWeek() {
  const saved = JSON.parse(localStorage.getItem("sportWeek"));
  const today = new Date();
  const day = today.getDay(); // 1 = lundi

  // Lundi = nouvelle semaine
  if (day === 1) {
    let newWeek = saved ? saved + 1 : 1;
    if (newWeek > 4) newWeek = 1;
    localStorage.setItem("sportWeek", JSON.stringify(newWeek));
    return newWeek;
  }

  // Sinon: garde la semaine actuelle
  return saved || 1;
}

async function loadSport() {
  const container = document.getElementById("sport-container");

  try {
    const response = await fetch("data/sport.json?cache=" + Date.now());
    const json = await response.json();

    const currentWeek = getCurrentWeek();
    const weekData = json["semaine" + currentWeek];

    container.innerHTML = "";

    weekData.forEach(day => {
      const div = document.createElement("div");
      div.className = "day-card";

      div.innerHTML = `
        <h3>${day.jour}</h3>
        <p><strong>${day.type}</strong></p>
        <p>${day.details}</p>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    container.innerHTML = "<p>Erreur lors du chargement du programme sport 🌧</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadSport);

  }
});
