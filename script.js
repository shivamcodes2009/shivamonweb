/* ════════════════════════════════════════
   ADVANCED PORTFOLIO JS
════════════════════════════════════════ */

/* LOADER */

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    document.getElementById("loader").style.visibility = "hidden";
  }, 3200);
});



/* MOBILE MENU */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  menuOverlay.classList.add("active");
});

menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

function closeMenu(){
  mobileMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
}

document.querySelectorAll("[data-close]").forEach(link => {
  link.addEventListener("click", closeMenu);
});

/* TYPING EFFECT */

const roleText = document.getElementById("roleText");

const roles = [
  "Frontend Developer",
  "UI/UX Designer",
  "Video Editor",
  "Content Creator",
  "Creative Coder"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

  const currentRole = roles[roleIndex];

  if(!deleting){
    roleText.textContent = currentRole.substring(0,charIndex++);
  }else{
    roleText.textContent = currentRole.substring(0,charIndex--);
  }

  if(charIndex === currentRole.length + 1){
    deleting = true;

    setTimeout(typeEffect,1200);
    return;
  }

  if(charIndex === 0){
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect,deleting ? 50 : 110);
}

typeEffect();

/* REVEAL */

const reveals = document.querySelectorAll(".reveal");

function revealSections(){
  reveals.forEach(sec => {
    const top = sec.getBoundingClientRect().top;

    if(top < window.innerHeight - 120){
      sec.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealSections);
revealSections();

/* SKILL BARS */

const skillFills = document.querySelectorAll(".skill-fill");

function animateSkills(){

  skillFills.forEach(fill => {
    const rect = fill.getBoundingClientRect();

    if(rect.top < window.innerHeight - 80){
      fill.style.width = fill.dataset.w + "%";
    }
  });
}

window.addEventListener("scroll", animateSkills);
animateSkills();

/* NAVBAR BG */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 40){
    navbar.style.background = "rgba(5,8,15,.85)";
    navbar.style.padding = "14px 6%";
  }else{
    navbar.style.background = "rgba(7,11,20,.45)";
    navbar.style.padding = "20px 6%";
  }

});

/* PARTICLE SYSTEM */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

class Particle{
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2.5;
    this.dx = (Math.random() - .5) * .7;
    this.dy = (Math.random() - .5) * .7;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
    ctx.fillStyle = "rgba(0,245,255,.8)";
    ctx.fill();
  }

  update(){
    this.x += this.dx;
    this.y += this.dy;

    if(this.x < 0 || this.x > canvas.width){
      this.dx *= -1;
    }

    if(this.y < 0 || this.y > canvas.height){
      this.dy *= -1;
    }

    this.draw();
  }
}

for(let i = 0; i < 120; i++){
  particles.push(new Particle());
}

function animateParticles(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    p.update();
  });

  for(let a = 0; a < particles.length; a++){

    for(let b = a; b < particles.length; b++){

      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;

      let dist = Math.sqrt(dx * dx + dy * dy);

      if(dist < 110){

        ctx.beginPath();
        ctx.strokeStyle = "rgba(0,245,255,.08)";
        ctx.lineWidth = 1;
        ctx.moveTo(particles[a].x,particles[a].y);
        ctx.lineTo(particles[b].x,particles[b].y);
        ctx.stroke();

      }

    }

  }

  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

/* REVIEW SLIDER */

const reviewsTrack = document.getElementById("reviewsTrack");
const prevBtn = document.getElementById("revPrev");
const nextBtn = document.getElementById("revNext");

nextBtn.addEventListener("click", () => {
  reviewsTrack.scrollBy({
    left:420,
    behavior:"smooth"
  });
});

prevBtn.addEventListener("click", () => {
  reviewsTrack.scrollBy({
    left:-420,
    behavior:"smooth"
  });
});

/* APPOINTMENT */

const plans = document.querySelectorAll(".plan-card");
const selectedLabel = document.getElementById("selectedPlanLabel");

plans.forEach(plan => {

  plan.addEventListener("click", () => {

    plans.forEach(p => p.classList.remove("plan-active"));

    plan.classList.add("plan-active");

    const name = plan.querySelector(".plan-name").textContent;
    const price = plan.querySelector(".plan-price").textContent;

    selectedLabel.textContent = `${name} — ${price}`;

  });

});

/* MODALS */

const paidBtn = document.getElementById("paidBtn");
const utrModal = document.getElementById("utrModal");
const modalClose = document.getElementById("modalClose");

paidBtn.addEventListener("click", () => {
  utrModal.classList.add("active");
});

modalClose.addEventListener("click", () => {
  utrModal.classList.remove("active");
});

/* UTR VALIDATION */

const utrInput = document.getElementById("utrInput");
const utrCount = document.getElementById("utrCount");
const verifyBtn = document.getElementById("verifyBtn");
const utrError = document.getElementById("utrError");

utrInput.addEventListener("input", () => {

  utrInput.value = utrInput.value.replace(/\D/g,"");

  utrCount.textContent = `${utrInput.value.length}/12`;

});

verifyBtn.addEventListener("click", () => {

  if(utrInput.value.length !== 12){

    utrError.textContent = "Please enter a valid 12-digit UTR number.";
    return;
  }

  utrError.textContent = "";

  utrModal.classList.remove("active");

  launchSuccess();

});

/* SUCCESS */

const successModal = document.getElementById("successModal");
const successClose = document.getElementById("successClose");

function launchSuccess(){

  successModal.classList.add("active");

  launchConfetti();
}

successClose.addEventListener("click", () => {
  successModal.classList.remove("active");
});

/* WHATSAPP */

document.getElementById("whatsappBtn").addEventListener("click", () => {

  const text = encodeURIComponent(
`Hello Shivam 👋

I have completed the payment.

UTR Number: ${utrInput.value}

Selected Plan: ${selectedLabel.textContent}

Please verify my payment & confirm my slot.`
  );

  window.open(`https://wa.me/919430932904?text=${text}`,"_blank");

});

/* CONTACT FORM */

document.getElementById("sendMsgBtn").addEventListener("click", () => {

  const name = document.getElementById("formName").value.trim();
  const email = document.getElementById("formEmail").value.trim();
  const msg = document.getElementById("formMsg").value.trim();

  if(!name || !email || !msg){
    alert("Please fill all fields.");
    return;
  }

  const text = encodeURIComponent(
`Hello Shivam 👋

Name: ${name}
Email: ${email}

Message:
${msg}`
  );

  window.open(`https://wa.me/919430932904?text=${text}`,"_blank");

});

/* DOWNLOAD CV */

document.getElementById("downloadCV").addEventListener("click", (e) => {

  e.preventDefault();

  const a = document.createElement("a");

  a.href = "Shivam-CV.pdf";

  a.download = "shivam cv.pdf";

  a.click();

});

/* CONFETTI */

const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");

confettiCanvas.width = innerWidth;
confettiCanvas.height = innerHeight;

let confetti = [];

class Confetti{
  constructor(){
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    this.size = Math.random() * 8 + 3;
    this.speed = Math.random() * 3 + 2;
    this.rotation = Math.random() * 360;
  }

  draw(){
    confettiCtx.save();

    confettiCtx.translate(this.x,this.y);
    confettiCtx.rotate(this.rotation);

    confettiCtx.fillStyle = `hsl(${Math.random()*360},100%,60%)`;

    confettiCtx.fillRect(
      -this.size/2,
      -this.size/2,
      this.size,
      this.size
    );

    confettiCtx.restore();
  }

  update(){
    this.y += this.speed;
    this.rotation += .05;
    this.draw();
  }
}

function launchConfetti(){

  confettiCanvas.style.display = "block";

  confetti = [];

  for(let i = 0; i < 220; i++){
    confetti.push(new Confetti());
  }

  let frame = 0;

  function animate(){

    frame++;

    confettiCtx.clearRect(
      0,
      0,
      confettiCanvas.width,
      confettiCanvas.height
    );

    confetti.forEach(c => {
      c.update();
    });

    if(frame < 220){
      requestAnimationFrame(animate);
    }else{
      confettiCanvas.style.display = "none";
    }

  }

  animate();
}

/* PARALLAX */

window.addEventListener("scroll", () => {

  const scroll = window.scrollY;

  document.querySelectorAll(".hero-photo-ring").forEach(el => {
    el.style.transform = `rotate(${scroll * .08}deg)`;
  });

});

/* ACTIVE NAV */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links-desktop a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(sec => {

    const top = sec.offsetTop - 150;
    const height = sec.clientHeight;

    if(pageYOffset >= top){
      current = sec.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if(link.getAttribute("href") === `#${current}`){
      link.classList.add("active");
    }

  });

});

/* MAGNET BUTTONS */

document.querySelectorAll(".btn").forEach(btn => {

  btn.addEventListener("mousemove", e => {

    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * .15}px,${y * .15}px)`;

  });

  btn.addEventListener("mouseleave", () => {

    btn.style.transform = "translate(0,0)";

  });

});

/* RANDOM GLOW */

setInterval(() => {

  document.querySelectorAll(".project-card").forEach(card => {

    card.style.boxShadow =
    `0 0 ${Math.random()*40}px rgba(0,245,255,.08)`;

  });

},2000);

console.log("🚀 Advanced Portfolio Loaded Successfully");