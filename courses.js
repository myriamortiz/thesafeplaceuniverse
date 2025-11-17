// 🛒 Chargement des courses depuis data/courses.json

async function loadCourses() {
  const container = document.getElementById("coursesList");
  if (!container) return;

  try {
   const response = await fetch("data/courses.json?cache=" + Date.now());

    );

    if (!response.ok) throw new Error("Erreur");

    const data = await response.json();
    container.innerHTML = "";

    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `• ${item}`;
      container.appendChild(li);
    });

  } catch (e) {
    container.innerHTML = "<p style='text-align:center;'>🧺 Impossible de charger la liste de courses</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadCourses);
