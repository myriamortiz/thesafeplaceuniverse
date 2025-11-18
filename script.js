// 🌸 The Safe Place Universe – Script principal

document.addEventListener("DOMContentLoaded", () => {
  
  // --- CITATION ALÉATOIRE ---
  const citations = [
    "Je prends soin de moi un jour à la fois 🌸",
    "Aujourd’hui j’avance avec douceur, pas à pas ✨",
    "Chaque petite action compte 💛",
    "Je suis capable, je suis forte, je suis constante 🌷",
    "Mon bien-être est une priorité, pas une option 💖"
  ];

  const box = document.querySelector(".citation-box");
  if (box) {
    box.textContent = citations[Math.floor(Math.random() * citations.length)];
  }

  // --- AUTO-MAJ DU CONTENU DES PAGES AVEC JSON ---
  function loadJSON(containerId, jsonPath, templateFn) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch(jsonPath + "?cache=" + Date.now())
      .then(r => r.json())
      .then(data => {
        container.innerHTML = "";
        data.forEach(item => container.innerHTML += templateFn(item));
      })
      .catch(() => {
        container.innerHTML = "<p>Impossible de charger le contenu 🌧</p>";
      });
  }

  // PAGE ALIMENTATION
  if (document.getElementById("alimentation-container")) {
    loadJSON(
      "alimentation-container",
      "data/alimentation.json",
      (day) => `
        <div class="day-card">
          <h3>${day.jour}</h3>
          <p>${day.brunch}</p>
          <p>${day.collation}</p>
          <p>${day.diner}</p>
        </div>
      `
    );
  }

  // PAGE RECETTES
  if (document.getElementById("recettes-container")) {
    loadJSON(
      "recettes-container",
      "data/recettes.json",
      (day) => `
        <div class="recette-day">
          <div class="day-title">${day.jour}</div>

          <div class="recette-bloc">
            <h3>Brunch</h3>
            <h4>Ingrédients</h4>
            <ul>${day.brunch.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
            <h4>Instructions</h4>
            <p>${day.brunch.instructions}</p>
          </div>

          <div class="recette-bloc">
            <h3>Collation</h3>
            <h4>Ingrédients</h4>
            <ul>${day.collation.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
            <h4>Instructions</h4>
            <p>${day.collation.instructions}</p>
          </div>

          <div class="recette-bloc">
            <h3>Dîner</h3>
            <h4>Ingrédients</h4>
            <ul>${day.diner.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
            <h4>Instructions</h4>
            <p>${day.diner.instructions}</p>
          </div>
        </div>
      `
    );
  }

  // PAGE COURSES
  if (document.getElementById("courses-container")) {
    fetch("data/courses.json?cache=" + Date.now())
      .then(r => r.json())
      .then(list => {
        const container = document.getElementById("courses-container");
        container.innerHTML = "";

        const grouped = {};

        function getCategory(item) {
          item = item.toLowerCase();
          if (["pomme","banane","framboise","kiwi"].some(w => item.includes(w))) return "🍎 Fruits";
          if (["carotte","courgette","poivron","betterave","salade","avocat","aubergine","épinard"].some(w => item.includes(w))) return "🥬 Légumes";
          if (["poulet","saumon","crevette","boeuf","dinde","œufs"].some(w => item.includes(w))) return "🍗 Protéines";
          if (["chèvre","brebis","yaourt"].some(w => item.includes(w))) return "🥛 Laitages chèvre/brebis";
          if (["riz","quinoa","chia","amandes","noix","beurre"].some(w => item.includes(w))) return "🥣 Placard";
          return "🧂 Divers";
        }

        list.forEach(item => {
          const cat = getCategory(item);
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(item);
        });

        for (const cat in grouped) {
          container.innerHTML += `<div class="category">${cat}</div>`;
          grouped[cat].forEach(item => {
            container.innerHTML += `
              <div class="item">
                <input type="checkbox" id="${item}">
                <label for="${item}">${item}</label>
              </div>
            `;
          });
        }
      })
      .catch(() => {
        document.getElementById("courses-container").innerHTML = "❌ Impossible de charger la liste.";
      });
  }

});
