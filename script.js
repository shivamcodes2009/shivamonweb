/* ================= SKILLS ================= */

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "GitHub",
  "Python",
  "AI Tools",
  "Responsive Design",
  "UI/UX",
  "GSAP Animation",
  "Frontend Development"
];

const grid = document.getElementById("skillsGrid");

skills.forEach(skill => {

  let div = document.createElement("div");

  div.className = "skill-card";

  div.innerHTML = `
    <h3>${skill}</h3>
  `;

  grid.appendChild(div);

});

/* ================= TYPING EFFECT ================= */

const text =
"Building modern, animated and AI-powered websites with creative UI/UX experiences.";

let i = 0;

function typeEffect(){

  if(i < text.length){

    document.getElementById("typing").textContent += text.charAt(i);

    i++;

    setTimeout(typeEffect, 40);
  }
}

typeEffect();

/* ================= SHOW EMAIL ================= */

function showEmail(){

  const box = document.getElementById("emailBox");

  if(box.style.display === "block"){

    box.style.display = "none";

  }else{

    box.style.display = "block";
  }
}

/* ================= GSAP ================= */

gsap.registerPlugin(ScrollTrigger);

/* reveal animation */

gsap.utils.toArray(".reveal").forEach((el)=>{

  gsap.to(el,{

    scrollTrigger:{
      trigger:el,
      start:"top 80%"
    },

    opacity:1,
    y:0,
    duration:1.2,
    ease:"power3.out"
  });

});

/* hero animation */

gsap.from(".hero-left",{

  x:-100,
  opacity:0,
  duration:1.5
});

gsap.from(".hero-right",{

  x:100,
  opacity:0,
  duration:1.5
});

/* floating animation */

gsap.to(".image-circle",{

  y:15,
  repeat:-1,
  yoyo:true,
  duration:2
});