// 🌿 Détection automatique de la saison
function getSeason() {
  const month = new Date().getMonth() + 1;
  if ([3, 4, 5].includes(month)) return "printemps";
  if ([6, 7, 8].includes(month)) return "été";
  if ([9, 10, 11].includes(month)) return "automne";
  return "hiver";
}

// 🍃 Données des compléments saisonniers
const complements = {
  printemps: {
    title: "🌸 Printemps – Détox & Énergie douce",
    list: [
      "🌿 Spiruline – booster naturel d’énergie",
      "🍋 Chlorella – soutien détox foie & peau",
      "🌼 Magnésium marin – équilibre nerveux et anti-fatigue",
      "🍵 Thé vert matcha – antioxydant et coup de fouet naturel",
      "💧 Zinc – soutien de la peau et du système immunitaire"
    ]
  },
  été: {
    title: "🌞 Été – Hydratation & éclat",
    list: [
      "🌺 Acide hyaluronique – hydratation profonde",
      "🍑 Bêta-carotène – préparation et protection solaire",
      "🥥 Électrolytes naturels – hydratation cellulaire",
      "🌿 Vitamine C – énergie et défense",
      "🧴 Oméga-3 – peau souple et apaisée"
    ]
  },
  automne: {
    title: "🍂 Automne – Immunité & sérénité",
    list: [
      "🍄 Reishi ou Shiitake – renfort immunitaire",
      "🍯 Gelée royale – tonus général",
      "🌾 Vitamine D3 – soutien de l’humeur et de l’immunité",
      "🌰 Fer & spiruline – contre la fatigue saisonnière",
      "🍇 Antioxydants (myrtille, raisin, curcuma)"
    ]
  },
  hiver: {
    title: "❄️ Hiver – Vitalité & cocooning intérieur",
    list: [
      "☀️ Vitamine D3 – lumière intérieure",
      "🍵 Ashwagandha – apaisement du stress",
      "🌿 Rhodiola – énergie mentale et équilibre émotionnel",
      "🍊 Vitamine C liposomale – défense naturelle",
      "🥥 Huile de poisson ou d’onagre – peau et immunité"
    ]
  }
};

// 🌸 Affichage dynamique
const season = getSeason();
const container = document.getElementById("complementsContainer");
const data = complements[season];

const card = document.createElement("div");
card.className = "day-card";
card.innerHTML = `
  <h2>${data.title}</h2>
  <ul>${data.list.map(item => `<li>${item}</li>`).join("")}</ul>
`;

container.appendChild(card);
