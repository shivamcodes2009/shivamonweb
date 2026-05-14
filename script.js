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
  "Frontend Development",
  "CapCut Editing",
  "VN Editing",
  "Alight Motion",
  "After Effects",
  "Content Creation"
];

const grid = document.getElementById("skillsGrid");

skills.forEach(skill => {

  let div = document.createElement("div");

  div.className = "skill-card";

  div.innerHTML = `<h3>${skill}</h3>`;

  grid.appendChild(div);

});

/* ================= TYPING EFFECT ================= */

const text =
"Building modern, animated, AI-powered websites and creating professional digital experiences.";

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

/* reveal */

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

/* hero */

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

/* text reveal */

gsap.utils.toArray(".reveal-text").forEach((text)=>{

  gsap.from(text,{
    y:100,
    opacity:0,
    duration:1,
    scrollTrigger:{
      trigger:text,
      start:"top 85%"
    }
  });

});

/* ================= ACTIVE NAVBAR ================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", ()=>{

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop;

    if(pageYOffset >= sectionTop - 200){

      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if(link.getAttribute("href") === `#${current}`){

      link.classList.add("active");
    }

  });

});

/* ================= LOADER ================= */

let load = 0;

const interval = setInterval(()=>{

  load++;

  document.getElementById("loading-text").innerText = load + "%";

  document.querySelector(".loader-progress").style.width = load + "%";

  if(load >= 100){

    clearInterval(interval);

    gsap.to(".loader",{
      opacity:0,
      duration:1,
      onComplete:()=>{

        document.querySelector(".loader").style.display = "none";
      }
    });

  }

},20);

/* ================= DARK LIGHT MODE ================= */

const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", ()=>{

  document.body.classList.toggle("light-mode");

  if(document.body.classList.contains("light-mode")){

    toggleBtn.innerHTML = `<i class="ri-sun-fill"></i>`;

  }else{

    toggleBtn.innerHTML = `<i class="ri-moon-fill"></i>`;
  }

});

/* ================= ADVANCE BACKGROUND MUSIC ================= */

const bgMusic = document.getElementById("bgMusic");

const musicToggle = document.getElementById("musicToggle");

/* VOLUME */

bgMusic.volume = 0.7;

/* BUTTON CLICK */

musicToggle.addEventListener("click", async () => {

  try{

    if(bgMusic.paused){

      await bgMusic.play();

      musicToggle.classList.add("playing");

    }else{

      bgMusic.pause();

      musicToggle.classList.remove("playing");

    }

  }catch(err){

    console.log("Music play failed:", err);

  }

});