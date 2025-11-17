// entrainements.js 🌸 – affichage auto des entraînements détaillés

// On récupère le programme courant depuis le localStorage
const currentProgram = JSON.parse(localStorage.getItem("currentSportProgram"));

const programsDetails = {
  "Semaine 1 — Reboost & Tonus": [
    {
      day: "💪 Lundi — Full Body Sculpt",
      objectif: "Activer tout le corps, relancer le métabolisme",
      echauffement: [
        "Jumping jacks — 30 sec",
        "Cercles de bras — 30 sec",
        "Montées de genoux — 30 sec",
        "Squats dynamiques — 30 sec",
        "Gainage planche — 30 sec"
      ],
      entrainement: [
        "Squats avec haltères — 35 sec / 15 sec repos",
        "Pompes sur genoux — 35 sec / 15 sec repos",
        "Fentes arrière (élastique autour des cuisses) — 35 sec / 15 sec repos",
        "Rowing buste penché — 35 sec / 15 sec repos",
        "Gainage dynamique (toucher épaules) — 35 sec / 15 sec repos"
      ],
      finisher: [
        "Chaise au mur — 1 min",
        "Abdos bicycle — 1 min",
        "Planche — 45 sec"
      ],
      etirements: ["Dos, jambes, bras — 5 min de relâchement"]
    },
    {
      day: "🔥 Mardi — Bas du corps + Cardio doux",
      objectif: "Renforcer les jambes, améliorer la circulation",
      echauffement: [
        "Step touch — 1 min",
        "Squats pulse — 30 sec",
        "Talon-fesses — 30 sec",
        "Fentes latérales — 30 sec",
        "Montées de genoux lentes — 30 sec"
      ],
      entrainement: [
        "Fentes arrière avec haltères — 3 tours, 35 sec/15 sec",
        "Squats sumo avec élastique — 3 tours, 35 sec/15 sec",
        "Kick arrière + élastique — 3 tours, 35 sec/15 sec",
        "Soulevé de terre haltères — 3 tours, 35 sec/15 sec"
      ],
      finisher: ["Ponts de fessiers x 20", "Jumping jacks doux x 30 sec", "Planche 45 sec"],
      etirements: ["Quadriceps, fessiers, ischios — 5 min"]
    },
    {
      day: "🧘‍♀️ Jeudi — Haut du corps + Core",
      objectif: "Tonifier les bras et renforcer la sangle abdominale",
      echauffement: [
        "Cercles de bras — 1 min",
        "Pompes murales — 10",
        "Gainage latéral doux — 20 sec",
        "Rotation du buste — 30 sec"
      ],
      entrainement: [
        "Pompes sur les genoux x 12",
        "Rowing haltères x 15",
        "Gainage épaule touch — 30 sec",
        "Crunch obliques — 30 sec",
        "Planche classique — 45 sec"
      ],
      finisher: ["Dips sur chaise x 10", "Superman — 45 sec", "Planche latérale — 30 sec par côté"],
      etirements: ["Bras, épaules, dos, abdos — 5 min"]
    },
    {
      day: "🌸 Vendredi — Cardio Fun + Stretch",
      objectif: "Libérer les tensions et activer la circulation",
      echauffement: [
        "Danse libre — 2 min",
        "Talon-fesses — 30 sec",
        "Step touch — 30 sec",
        "Montées de genoux — 30 sec"
      ],
      entrainement: [
        "Circuit cardio doux (3 tours) : Jumping jacks → Squats → Gainage → Marche sur place → Fentes alternées",
        "Chaque exercice : 30 sec effort / 15 sec repos"
      ],
      finisher: ["Stretch full body 10 min", "Respiration consciente — 3 min", "Affirmation : « Je suis forte et sereine » 🌷"],
      etirements: ["Étirements globaux, respiration 3 min"]
    }
  ],

  "Semaine 2 — Défi Énergie": [
    {
      day: "💥 Lundi — HIIT doux",
      objectif: "Stimuler ton énergie sans excès",
      echauffement: ["Jumping jacks — 1 min", "Squats — 30 sec", "Gainage — 30 sec"],
      entrainement: [
        "Burpees simplifiés — 30 sec",
        "Fentes alternées — 30 sec",
        "Pompes sur genoux — 30 sec",
        "Planche — 30 sec",
        "Squat sauté — 30 sec"
      ],
      finisher: ["Gainage dynamique 45 sec", "Abdos + respiration 1 min"],
      etirements: ["Étirements doux 5 min"]
    },
    {
      day: "🔥 Mardi — Lower Burn",
      objectif: "Brûler et tonifier les jambes",
      echauffement: ["Fentes latérales — 1 min", "Squats — 30 sec"],
      entrainement: [
        "Fentes arrière avec haltères — 40 sec",
        "Squat jump doux — 30 sec",
        "Pont fessier — 30 sec",
        "Montées de genoux — 30 sec"
      ],
      finisher: ["Step touch 1 min", "Planche 45 sec"],
      etirements: ["Étirements bas du corps 5 min"]
    },
    {
      day: "🧘‍♀️ Jeudi — Upper Focus",
      objectif: "Renforcer bras et dos",
      echauffement: ["Cercles de bras — 1 min", "Rotation du buste — 1 min"],
      entrainement: [
        "Pompes murales — 10",
        "Rowing haltères — 15",
        "Planche — 30 sec",
        "Superman — 30 sec"
      ],
      finisher: ["Dips sur chaise 10", "Étirements bras 5 min"],
      etirements: ["Respiration consciente 3 min"]
    },
    {
      day: "🌿 Vendredi — Danse + Stretch",
      objectif: "Cardio plaisir et mobilité",
      echauffement: ["Danse libre 2 min"],
      entrainement: ["Routine danse 15 min", "Cardio fun 10 min"],
      finisher: ["Stretch full body 10 min"],
      etirements: ["Détente 5 min"]
    }
  ],

  "Semaine 3 — Sculpt & Focus": [
    {
      day: "💪 Lundi — Full Body Sculpt",
      objectif: "Tonifier et équilibrer",
      echauffement: ["Squats dynamiques 1 min", "Gainage 30 sec"],
      entrainement: [
        "Squat + haltères — 40 sec",
        "Pompes sur genoux — 30 sec",
        "Rowing haltères — 30 sec",
        "Gainage dynamique — 30 sec"
      ],
      finisher: ["Planche 1 min"],
      etirements: ["Stretch global 5 min"]
    },
    {
      day: "🔥 Mardi — Cardio Burn",
      objectif: "Activer le métabolisme",
      echauffement: ["Montées de genoux — 1 min", "Jumping jacks — 30 sec"],
      entrainement: [
        "Burpees doux — 30 sec",
        "Squats sautés — 30 sec",
        "Gainage — 30 sec",
        "Mountain climbers — 30 sec"
      ],
      finisher: ["Planche — 1 min", "Stretch 5 min"],
      etirements: ["Respiration lente 3 min"]
    },
    {
      day: "🧘‍♀️ Jeudi — Core & Posture",
      objectif: "Renforcer le centre et la posture",
      echauffement: ["Abdos profonds — 1 min"],
      entrainement: [
        "Crunch lent — 20 reps",
        "Gainage bras tendus — 45 sec",
        "Superman — 30 sec",
        "Planche latérale — 30 sec par côté"
      ],
      finisher: ["Pont fessier — 20 reps"],
      etirements: ["Dos + abdos — 5 min"]
    },
    {
      day: "🌸 Vendredi — Yoga Flow & Stretch",
      objectif: "Souplesse et reconnexion",
      echauffement: ["Respiration — 1 min"],
      entrainement: ["Yoga flow — 30 min"],
      finisher: ["Relaxation 10 min"],
      etirements: ["Étirements doux"]
    }
  ]
};

const container = document.getElementById("detailedWorkouts");
const programName = currentProgram ? currentProgram.name : "Semaine 1 — Reboost & Tonus";
const week = programsDetails[programName] || programsDetails["Semaine 1 — Reboost & Tonus"];

document.querySelector(".splash h1").textContent = `📋 ${programName}`;
container.innerHTML = week
  .map(
    w => `
    <div class="day-card">
      <h3>${w.day}</h3>
      <p><strong>Objectif :</strong> ${w.objectif}</p>
      <h4>Échauffement</h4><ul>${w.echauffement.map(x => `<li>${x}</li>`).join("")}</ul>
      <h4>Entraînement</h4><ul>${w.entrainement.map(x => `<li>${x}</li>`).join("")}</ul>
      <h4>Finisher</h4><ul>${w.finisher.map(x => `<li>${x}</li>`).join("")}</ul>
      <h4>Étirements</h4><ul>${w.etirements.map(x => `<li>${x}</li>`).join("")}</ul>
    </div>`
  )
  .join("");
