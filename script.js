/*
=====================================
BEGINNER PORTFOLIO WEBSITE
=====================================
*/

const portfolioData = {

  name: "Shivam Choudhary",

  role: "Frontend Learner & Explorer",

  bio: "Learning web development, GitHub workflows, and deployment using Vercel.",

  skills: [
    "Master of Alight Motion",
    "Master of CapCut",
    "Master of VN Editor",
    "AI",
    "HTML",
    "Java",
    "Python",
    "GitHub",
    "Web Designing",
    "CSS"
  ]

};


/* =====================================
   RENDER DATA
===================================== */

document.getElementById("name").textContent = portfolioData.name;
document.getElementById("role").textContent = portfolioData.role;
document.getElementById("bio").textContent = portfolioData.bio;

const skillsContainer = document.getElementById("skills");

portfolioData.skills.forEach(skill => {
  const skillCard = document.createElement("div");
  skillCard.classList.add("skill-card");
  skillCard.textContent = skill;
  skillsContainer.appendChild(skillCard);
});


/* =====================================
   THEME TOGGLE (BLUE ↔ RED)
===================================== */

const themeButton = document.getElementById("themeButton");
const body = document.body;

// default theme
body.classList.add("blue-theme");

themeButton.addEventListener("click", () => {

  if (body.classList.contains("blue-theme")) {
    body.classList.remove("blue-theme");
    body.classList.add("red-theme");
  } else {
    body.classList.remove("red-theme");
    body.classList.add("blue-theme");
  }

});


/* =====================================
   CONTACT BUTTON
===================================== */

document.getElementById("contactButton")
  .addEventListener("click", () => {
    alert("Thanks for visiting my portfolio!");
  });