// bien-etre.js 🌸 – Sauvegarde automatique du ressenti
document.addEventListener("DOMContentLoaded", () => {
  const mood = document.getElementById("bienEtreMood");
  const msg = document.getElementById("bienEtreMsg");

  if (localStorage.getItem("bienEtreMood")) mood.value = localStorage.getItem("bienEtreMood");

  mood.addEventListener("input", () => {
    localStorage.setItem("bienEtreMood", mood.value);
    msg.style.display = "block";
    msg.style.opacity = "1";
    setTimeout(() => {
      msg.style.opacity = "0";
      setTimeout(() => (msg.style.display = "none"), 400);
    }, 1500);
  });
});
