// sport.js 🌸 – Génération automatique hebdomadaire
const SPORT_UPDATE_KEY = "lastSportUpdate";
const SPORT_PROGRAM_KEY = "currentSportProgram";

// 💫 Liste de programmes disponibles
const programs = [
  {
    name: "Semaine 1 — Reboost & Tonus",
    focus: [
      { day: "Lundi", theme: "Full Body Sculpt", type: "Renfo global" },
      { day: "Mardi", theme: "Bas du corps + Cardio doux", type: "Fessiers / cuisses" },
      { day: "Jeudi", theme: "Haut du corps + Core", type: "Bras / gainage" },
      { day: "Vendredi", theme: "Cardio Fun + Stretch", type: "Mobilité / légèreté" }
    ]
  },
  {
    name: "Semaine 2 — Défi Énergie",
    focus: [
      { day: "Lundi", theme: "HIIT doux", type: "Endurance" },
      { day: "Mardi", theme: "Lower Burn", type: "Jambes & fessiers" },
      { day: "Jeudi", theme: "Upper Focus", type: "Bras / Dos / Core" },
      { day: "Vendredi", theme: "Danse + Stretch", type: "Mobilité" }
    ]
  },
  {
    name: "Semaine 3 — Sculpt & Focus",
    focus: [
      { day: "Lundi", theme: "Full Body Sculpt", type: "Tonification globale" },
      { day: "Mardi", theme: "Cardio Burn", type: "Cardio contrôlé" },
      { day: "Jeudi", theme: "Core & Posture", type: "Renforcement abdominal" },
      { day: "Vendredi", theme: "Yoga Flow & Stretch", type: "Récupération active" }
    ]
  }
];

// 🌙 Vérifie s’il faut créer une nouvelle semaine
function isNewSportWeek() {
  const last = localStorage.getItem(SPORT_UPDATE_KEY);
  if (!last) return true;
  const diff = (new Date() - new Date(last)) / (1000 * 60 * 60 * 24);
  return diff >= 7;
}

// 🔁 Génère automatiquement un nouveau programme
function generateNewProgram() {
  const currentIndex =
    parseInt(localStorage.getItem("programIndex") || "0", 10) % programs.length;
  const nextIndex = (currentIndex + 1) % programs.length;

  localStorage.setItem("programIndex", nextIndex);
  localStorage.setItem(SPORT_PROGRAM_KEY, JSON.stringify(programs[nextIndex]));
  localStorage.setItem(SPORT_UPDATE_KEY, new Date().toISOString());

  showBanner();
  window.location.reload();
}

// 🌸 Affiche la bannière douce
function showBanner() {
  const banner = document.getElementById("autoBanner");
  banner.style.display = "block";
  setTimeout(() => {
    banner.classList.add("fade-out");
    setTimeout(() => (banner.style.display = "none"), 1500);
  }, 4000);
}

// 💕 Affiche le programme
function renderSportPlan() {
  const container = document.getElementById("sportPlan");
  const data = JSON.parse(localStorage.getItem(SPORT_PROGRAM_KEY));

  if (!data) return;

  document.querySelector(".splash h1").textContent = `💪 ${data.name}`;
  container.innerHTML = data.focus
    .map(
      f => `
      <div class="day-card">
        <h3>🌸 ${f.day}</h3>
        <p><strong>Thème :</strong> ${f.theme}</p>
        <p><strong>Type :</strong> ${f.type}</p>
        <p><strong>Durée :</strong> 45 min</p>
      </div>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  if (isNewSportWeek()) {
    generateNewProgram();
  } else {
    renderSportPlan();
  }

  // 🌿 Ressenti
  const mood = document.getElementById("sportMood");
  const msg = document.getElementById("sportMsg");
  if (localStorage.getItem("sportMood")) mood.value = localStorage.getItem("sportMood");
  mood.addEventListener("input", () => {
    localStorage.setItem("sportMood", mood.value);
    msg.style.display = "block";
    msg.style.opacity = "1";
    setTimeout(() => {
      msg.style.opacity = "0";
      setTimeout(() => (msg.style.display = "none"), 400);
    }, 1500);
  });
});
