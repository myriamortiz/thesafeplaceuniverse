// autoUpdate.js — Safe Place Universe (fiable & simple)
// Détecte un nouveau LUNDI (semaine) et un nouveau MOIS, même si l'app s'ouvre plus tard dans la journée.

(() => {
  const WEEK_KEY = "spu_week_key";
  const MONTH_KEY = "spu_month_key";

  // Lundi de la semaine (aaaa-mm-jj)
  function getWeekKey(date = new Date()) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    // Lundi = 0, Mardi = 1, ... Dimanche = 6
    const day = (d.getDay() + 6) % 7; 
    d.setDate(d.getDate() - day);
    return d.toISOString().slice(0, 10);
  }

  function getMonthKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }

  // --- BANNIÈRE ---
  function showAutoBanner(msg = "✨ Nouvelle semaine, tout est à jour !") {
    const banner = document.getElementById("autoBanner");
    if (!banner) return;
    banner.textContent = msg;
    banner.style.display = "block";
    setTimeout(() => {
      banner.classList.add("fade-out");
      setTimeout(() => (banner.style.display = "none"), 1500);
    }, 3000);
  }

  // --- RÉGÉNÉRATION DES DONNÉES HEBDO ---
  function regenerateWeeklyData() {
    // Nettoyage des anciens jeux (alimentation, recettes, courses, sport)
    localStorage.removeItem("mealPlan");
    localStorage.removeItem("recipes");
    localStorage.removeItem("shoppingList");
    // On efface les cases cochées de la liste de courses
    Object.keys(localStorage).forEach(k => { if (k.startsWith("chk-")) localStorage.removeItem(k); });
  }

  // --- RÉGÉNÉRATION DES DONNÉES MENSUELLES ---
  function regenerateMonthlyData() {
    // Vision board : tes scripts mensuels liront ce changement et régénèreront citations/intentions
    // (Ici on peut juste poser un drapeau si besoin, ou effacer un cache mensuel si tu en as un)
    // Exemple :
    localStorage.removeItem("visionMonthlySeed");
  }

  // --- FLOW PRINCIPAL ---
  function runAutoUpdate() {
    const now = new Date();
    const currentWeek = getWeekKey(now);
    const currentMonth = getMonthKey(now);

    const savedWeek = localStorage.getItem(WEEK_KEY);
    const savedMonth = localStorage.getItem(MONTH_KEY);

    const url = new URL(window.location.href);
    const force = url.searchParams.get("forceUpdate") === "1";

    let didUpdate = false;

    // Nouveau lundi détecté (ou forçage)
    if (force || savedWeek !== currentWeek) {
      regenerateWeeklyData();
      localStorage.setItem(WEEK_KEY, currentWeek);
      didUpdate = true;
    }

    // Nouveau mois détecté (ou forçage)
    if (force || savedMonth !== currentMonth) {
      regenerateMonthlyData();
      localStorage.setItem(MONTH_KEY, currentMonth);
      didUpdate = true;
    }

    if (didUpdate) {
      // Recharge légère pour que les pages reconstruisent leurs contenus (plans/recettes/etc.)
      const hasBanner = document.getElementById("autoBanner");
      if (hasBanner) {
        // On ré-affiche la page avec un flag pour montrer la bannière
        const u = new URL(window.location.href);
        u.searchParams.set("newWeek", "true");
        window.location.replace(u.toString());
      } else {
        window.location.reload();
      }
    } else {
      // Si on arrive ici et qu'on a le flag newWeek → montrer la bannière
      if (new URL(window.location.href).searchParams.get("newWeek") === "true") {
        showAutoBanner();
      }
    }
  }

  document.addEventListener("DOMContentLoaded", runAutoUpdate);
})();
