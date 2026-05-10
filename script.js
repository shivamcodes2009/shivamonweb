const portfolioData = {
  name: "Shivam Choudhary",
  role: "Frontend Learner & Explorer",
  bio: "Learning modern web development with animations and UI effects.",
  skills: [
    "HTML", "CSS", "JavaScript",
    "GitHub", "Python", "Java",
    "CapCut", "Alight Motion"
  ]
};


/* ===== TEXT RENDER ===== */
document.getElementById("name").textContent = portfolioData.name;
document.getElementById("role").textContent = portfolioData.role;


/* ===== AI TYPING EFFECT ===== */
const typingText = "Building modern interactive websites...";
let i = 0;

function typeEffect() {
  if (i < typingText.length) {
    document.getElementById("typing").textContent += typingText.charAt(i);
    i++;
    setTimeout(typeEffect, 60);
  }
}
typeEffect();


/* ===== SKILLS + POPUP ===== */
const skillsContainer = document.getElementById("skills");

portfolioData.skills.forEach(skill => {
  const card = document.createElement("div");
  card.classList.add("skill-card");
  card.textContent = skill;

  card.addEventListener("click", () => {
    showPopup(skill);
  });

  skillsContainer.appendChild(card);
});


/* POPUP */
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");

function showPopup(skill) {
  popup.classList.remove("hidden");
  popupText.textContent = "Skill: " + skill;
}

function closePopup() {
  popup.classList.add("hidden");
}


/* ===== THEME TOGGLE ===== */
const body = document.body;
const themeButton = document.getElementById("themeButton");

body.classList.add("blue-theme");

themeButton.addEventListener("click", () => {
  body.classList.toggle("blue-theme");
  body.classList.toggle("red-theme");
});


/* CONTACT */
document.getElementById("contactButton")
.addEventListener("click", () => {
  alert("Thanks for visiting my upgraded portfolio 🚀");
});