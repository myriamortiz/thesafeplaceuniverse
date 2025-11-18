/* 🌸 THE SAFE PLACE UNIVERSE – STYLE GLOBAL */

/* Font & ambiance */
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&family=Playfair+Display:wght@500&display=swap');

:root {
  --rose: #f8d8e7;
  --lavande: #e7d7f7;
  --menthe: #dff3ec;
  --pêche: #ffe5d0;
  --blanc: #fffafc;
  --texte: #514b52;
  --accent: #f0b8ca;
}

* {
  box-sizing: border-border;
  margin: 0;
  padding: 0;
}

body {
  background: radial-gradient(circle at top left, var(--rose) 0%, var(--lavande) 40%, var(--menthe) 80%, var(--pêche) 100%);
  background-attachment: fixed;
  color: var(--texte);
  font-family: 'Quicksand', sans-serif;
  padding: 2rem;
  line-height: 1.6;
  animation: fadeIn 1.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

h1, h2 {
  font-family: 'Playfair Display', serif;
  color: var(--texte);
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.3em;
}

.subtitle {
  text-align: center;
  color: var(--texte);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

/* 🌸 CITATION DU JOUR CENTRÉE */
.mantra {
  background: var(--blanc);
  border-radius: 25px;
  padding: 1.5rem 2rem;
  max-width: 650px;
  margin: 1.8rem auto;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  font-style: italic;
}

/* Cartes pastel */
.card {
  background: var(--blanc);
  border-radius: 25px;
  padding: 1.5rem 2rem;
  margin: 1.5rem auto;
  max-width: 700px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* 🌸 --- NOUVEL ALIGNEMENT : TON ESPACE PERSONNEL --- */
.personal-section {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.personal-card {
  background: var(--blanc);
  border-radius: 20px;
  padding: 1.5rem;
  flex: 1 1 280px;
  max-width: 380px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.personal-card h3 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
}

/* Inputs harmonieux */
input[type="text"], textarea {
  width: 100%;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid #ecd8f8;
  background: #fff;
  margin: 6px 0;
  font-size: 0.95rem;
}

/* 🧁 PETITES CARTES DU BAS ("Explore ton univers") */
.bottom-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 1.5rem;
}

.bottom-menu a {
  background: var(--blanc);
  padding: 0.7rem 1.2rem;
  border-radius: 20px;
  text-decoration: none;
  color: var(--texte);
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  font-weight: 500;
  transition: 0.2s;
}

.bottom-menu a:hover {
  transform: translateY(-3px);
  background: var(--accent);
  color: white;
}

/* 🌸 Recettes */
#recettes-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.recette-day {
  background: rgba(255, 255, 255, 0.85);
  padding: 25px;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

/* Page Courses */
.course-item {
  padding: 14px 20px;
  background: #fffafc;
  border-radius: 14px;
  margin: 12px 0;
  box-shadow: 0 3px 8px rgba(255, 180, 220, 0.25);
  display: flex;
  gap: 12px;
  font-size: 18px;
  align-items: center;
}
