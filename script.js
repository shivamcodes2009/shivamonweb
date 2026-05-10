/*
=====================================
BEGINNER PORTFOLIO WEBSITE
=====================================

This file contains:

1. Portfolio data
2. Dynamic rendering
3. Theme toggle
4. Button interaction

=====================================
*/


/* =====================================
   PORTFOLIO DATA
===================================== */

/*
Instead of a JSON file,
we use a JavaScript object.

This is easier for beginners.
*/

const portfolioData = {

  name: "Shivam Choudhary",

  role: "Frontend Learner & Explorer",

  bio: "Learning web development, GitHub workflows, and deployment using Vercel.",

  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "GitHub",
    "Vercel"
  ]

};



/* =====================================
   RENDER DATA TO WEBSITE
===================================== */

// Name
document.getElementById("name").textContent =
  portfolioData.name;

// Role
document.getElementById("role").textContent =
  portfolioData.role;

// Bio
document.getElementById("bio").textContent =
  portfolioData.bio;


// Skills container
const skillsContainer =
  document.getElementById("skills");


// Loop through skills array
portfolioData.skills.forEach(skill => {

  // Create card
  const skillCard =
    document.createElement("div");

  // Add class
  skillCard.classList.add("skill-card");

  // Add text
  skillCard.textContent = skill;

  // Add to webpage
  skillsContainer.appendChild(skillCard);

});



/* =====================================
   THEME BUTTON
===================================== */

const themeButton =
  document.getElementById("themeButton");

themeButton.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

});



/* =====================================
   CONTACT BUTTON
===================================== */

const contactButton =
  document.getElementById("contactButton");

contactButton.addEventListener("click", () => {

  alert("Thanks for visiting my portfolio!");

});