gsap.registerPlugin(ScrollTrigger);

/* ===== SKILLS ===== */
const skills = [
  "HTML", "CSS", "JavaScript", "GitHub", "Python",
  "AI Tools", "Responsive Design", "UI/UX", "GSAP Animation",
  "Frontend Development", "CapCut Editing", "VN Editing",
  "Alight Motion", "After Effects", "Content Creation"
];

const grid = document.getElementById("skillsGrid");

function loadSkills() {
  skills.forEach(skill => {
    let div = document.createElement("div");
    div.className = "skill-card";
    div.innerHTML = `<h3>${skill}</h3>`;
    grid.appendChild(div);
  });
}

/* ===== TYPING ===== */
const lines = [
  "Building modern, animated, AI-powered websites and creating professional digital experiences.",
  "Transforming ideas into real digital experiences using HTML, CSS & JavaScript.",
  "Creating cinematic video content & stunning UI designs."
];

let lineIndex = 0, charIndex = 0, deleting = false;
const typingEl = document.getElementById("typing");

function typeEffect() {
  const current = lines[lineIndex];

  if (!deleting) {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }

  setTimeout(typeEffect, deleting ? 30 : 50);
}

/* ===== LOADER ===== */
let progress = 0;
const fill = document.getElementById("loaderFill");
const pct = document.getElementById("loaderPercent");
const loader = document.getElementById("loader");

const interval = setInterval(() => {
  progress++;
  fill.style.width = progress + "%";
  pct.textContent = progress + "%";

  if (progress >= 100) {
    clearInterval(interval);

    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          loader.style.display = "none";

          loadSkills(); // ⭐ IMPORTANT FIX HERE

          startHeroAnim();
          typeEffect();

          // ⭐ FIX: refresh ScrollTrigger AFTER DOM is ready
          ScrollTrigger.refresh();
        }
      });
    }, 200);
  }
}, 15);

/* ===== HERO ===== */
function startHeroAnim() {
  gsap.from(".hero-left > *", {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out"
  });

  gsap.from(".hero-right", {
    x: 60,
    opacity: 0,
    duration: 1.1,
    delay: 0.2
  });
}

/* ===== REVEAL FIX ===== */
gsap.utils.toArray(".reveal").forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

/* ===== SKILLS ANIMATION FIX ===== */
ScrollTrigger.batch(".skill-card", {
  onEnter: batch =>
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out"
    }),
  start: "top 90%"
});

/* ===== PROJECTS ===== */
gsap.utils.toArray(".project-card").forEach((card) => {
  gsap.fromTo(card,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

/* ===== STATS ===== */
gsap.from(".stat-box", {
  scrollTrigger: {
    trigger: ".stats",
    start: "top 85%"
  },
  scale: 0.9,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1
});

/* ===== NAV ACTIVE ===== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);

  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ===== MOBILE MENU ===== */
document.getElementById("menuBtn").onclick = () =>
  document.getElementById("mobileMenu").classList.add("open");

document.getElementById("mobileClose").onclick = () =>
  document.getElementById("mobileMenu").classList.remove("open");

document.querySelectorAll(".mob-link").forEach(link =>
  link.addEventListener("click", () =>
    document.getElementById("mobileMenu").classList.remove("open")
  )
);

/* ===== EMAIL ===== */
function showEmail() {
  const box = document.getElementById("emailBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

/* ===== PAYMENT ===== */
function openPayment() {
  document.getElementById("paymentModal").classList.add("show");
}
function closePayment() {
  document.getElementById("paymentModal").classList.remove("show");
}

document.getElementById("paymentModal").addEventListener("click", e => {
  if (e.target === e.currentTarget) closePayment();
});

function showUTR() {
  document.getElementById("utrArea").style.display = "block";
}

let savedUTR = "";

function verifyPayment() {
  const utr = document.getElementById("utrInput").value.trim();
  if (!utr) return;

  savedUTR = utr;
  closePayment();

  // 🔥 ADD SOUND HERE
  const sound = document.getElementById("successSound");
  sound.currentTime = 0;
  sound.play();

  setTimeout(() => {
    document.getElementById("successPopup").classList.add("show");
  }, 300);
}

function goWhatsApp() {
  const phone = "919430932904";
  const msg = `Hello Shivam, Payment done. UTR: ${savedUTR}`;
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

/* SUCCESS POPUP CLOSE */
document.getElementById("successPopup").addEventListener("click", e => {
  if (e.target === e.currentTarget)
    e.currentTarget.classList.remove("show");
});