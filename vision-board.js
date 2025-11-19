// --- MOT DU MOIS ---
fetch("data/mot-du-mois.json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("mot-container").innerHTML = `
      <p class="vision-text">${data.mot}</p>
    `;
  })
  .catch(() => {
    document.getElementById("mot-container").innerHTML = "🌧 Impossible de charger le mot du mois";
  });


// --- AFFIRMATION DU MOIS ---
fetch("data/affirmation.json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("affirmation-container").innerHTML = `
      <p class="vision-text">${data.affirmation}</p>
    `;
  })
  .catch(() => {
    document.getElementById("affirmation-container").innerHTML = "🌧 Impossible de charger l’affirmation du mois";
  });


// --- SAUVEGARDE DES INTENTIONS ---
const intentionInputs = document.querySelectorAll(".intention");

const savedIntentions = JSON.parse(localStorage.getItem("intentions")) || {};

intentionInputs.forEach((input, index) => {
  input.value = savedIntentions[index] || "";

  input.addEventListener("input", () => {
    savedIntentions[index] = input.value;
    localStorage.setItem("intentions", JSON.stringify(savedIntentions));
  });
});

    localStorage.setItem(lastMonthKey, currentMonth);
  }
});
