/* ════════════════════════════════════════════════════════
   SHIVAM CHOUDHARY — ADVANCED FUTURISTIC PORTFOLIO JS
   Features: Loader · Cursor · Particles · Theme Switcher
             AI Chatbot · Skill Tabs · Project Case Studies
             Stats Counter · Reviews · Chatbot TTS · Forms
════════════════════════════════════════════════════════ */

"use strict";

/* ═══════════════════════════════════════════════════════
   1. LOADER
═══════════════════════════════════════════════════════ */
const loader = document.getElementById("loader");

const loaderMessages = [
  "Initializing Systems...",
  "Loading Portfolio...",
  "Rendering UI...",
  "Almost There..."
];

let msgIdx = 0;
const loaderStatusText = document.querySelector(".loader-status-text");

const loaderMsgInterval = setInterval(() => {
  msgIdx = (msgIdx + 1) % loaderMessages.length;
  if (loaderStatusText) loaderStatusText.textContent = loaderMessages[msgIdx];
}, 800);

// Build animated loader grid dots
const loaderGrid = document.querySelector(".loader-grid");
if (loaderGrid) {
  for (let i = 0; i < 32; i++) {
    const d = document.createElement("div");
    d.style.cssText = `
      width:8px;height:8px;border-radius:2px;
      background:rgba(0,245,255,0.15);
      animation:dotFade ${0.4 + Math.random() * 1.2}s ${Math.random() * 1}s infinite;
    `;
    loaderGrid.appendChild(d);
  }
}

window.addEventListener("load", () => {
  setTimeout(() => {
    clearInterval(loaderMsgInterval);
    loader.classList.add("hidden");
    // Trigger hero count-up after loader
    setTimeout(startCountUps, 600);
  }, 3400);
});


/* ═══════════════════════════════════════════════════════
   2. CUSTOM CURSOR
═══════════════════════════════════════════════════════ */
const cursorDot  = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top  = mouseY + "px";
});

// Smooth ring follow
(function animRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top  = ringY + "px";
  requestAnimationFrame(animRing);
})();

// Hover effect on interactive elements
const hoverTargets = "a,button,.btn,.skill-card,.project-card,.plan-card,.review-card,.current-card,.stat-card";
document.addEventListener("mouseover", e => {
  if (e.target.closest(hoverTargets)) {
    cursorRing.classList.add("hovering");
    cursorDot.style.transform = "translate(-50%,-50%) scale(2)";
  }
});
document.addEventListener("mouseout", e => {
  if (e.target.closest(hoverTargets)) {
    cursorRing.classList.remove("hovering");
    cursorDot.style.transform = "translate(-50%,-50%) scale(1)";
  }
});


/* ═══════════════════════════════════════════════════════
   3. PARTICLE CANVAS
═══════════════════════════════════════════════════════ */
const canvas = document.getElementById("particleCanvas");
const ctx    = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * canvas.width;
    this.y  = Math.random() * canvas.height;
    this.r  = Math.random() * 1.8 + 0.4;
    this.dx = (Math.random() - 0.5) * 0.55;
    this.dy = (Math.random() - 0.5) * 0.55;
    this.alpha = Math.random() * 0.5 + 0.2;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,245,255,${this.alpha})`;
    ctx.fill();
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > canvas.width)  this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height)  this.dy *= -1;
    this.draw();
  }
}

const particles = Array.from({ length: 100 }, () => new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());

  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx   = particles[a].x - particles[b].x;
      const dy   = particles[a].y - particles[b].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 105) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,245,255,${0.07 * (1 - dist / 105)})`;
        ctx.lineWidth   = 0.8;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();


/* ═══════════════════════════════════════════════════════
   4. THEME SWITCHER
═══════════════════════════════════════════════════════ */
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themePanel     = document.getElementById("themePanel");
const themeBtns      = document.querySelectorAll(".theme-btn");

// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
applyTheme(savedTheme);

themeToggleBtn.addEventListener("click", e => {
  e.stopPropagation();
  themePanel.classList.toggle("open");
});

document.addEventListener("click", e => {
  if (!e.target.closest(".theme-switcher")) themePanel.classList.remove("open");
});

themeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme;
    applyTheme(theme);
    localStorage.setItem("portfolio-theme", theme);
    themePanel.classList.remove("open");
  });
});

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeBtns.forEach(b => b.classList.toggle("active", b.dataset.theme === theme));
}


/* ═══════════════════════════════════════════════════════
   5. NAVBAR
═══════════════════════════════════════════════════════ */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Active nav link on scroll
const sections  = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links-desktop a");

window.addEventListener("scroll", highlightNav);

function highlightNav() {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 180) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}


/* ═══════════════════════════════════════════════════════
   6. MOBILE MENU
═══════════════════════════════════════════════════════ */
const hamburger   = document.getElementById("hamburger");
const mobileMenu  = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose   = document.getElementById("menuClose");

hamburger.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);
document.querySelectorAll("[data-close]").forEach(link => link.addEventListener("click", closeMenu));

function openMenu()  { mobileMenu.classList.add("active");    menuOverlay.classList.add("active"); }
function closeMenu() { mobileMenu.classList.remove("active"); menuOverlay.classList.remove("active"); }


/* ═══════════════════════════════════════════════════════
   7. TYPING EFFECT
═══════════════════════════════════════════════════════ */
const roleText = document.getElementById("roleText");
const roles = [
  "Frontend Experiences",
  "UI/UX Designs",
  "AI-Powered Tools",
  "Creative Websites",
  "Video Content",
  "Digital Products"
];

let roleIdx  = 0;
let charIdx  = 0;
let deleting = false;

function typeEffect() {
  const current = roles[roleIdx];
  if (!deleting) {
    roleText.textContent = current.substring(0, charIdx++);
  } else {
    roleText.textContent = current.substring(0, charIdx--);
  }

  if (charIdx === current.length + 1) {
    deleting = true;
    setTimeout(typeEffect, 1400);
    return;
  }
  if (charIdx === 0) {
    deleting = false;
    roleIdx  = (roleIdx + 1) % roles.length;
  }
  setTimeout(typeEffect, deleting ? 45 : 100);
}
typeEffect();


/* ═══════════════════════════════════════════════════════
   8. SCROLL REVEAL
═══════════════════════════════════════════════════════ */
const revealEls  = document.querySelectorAll(".reveal, .reveal-tl");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -80px 0px" });

revealEls.forEach(el => revealObserver.observe(el));


/* ═══════════════════════════════════════════════════════
   9. SKILL BARS ANIMATION
═══════════════════════════════════════════════════════ */
const skillFillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.w + "%";
      skillFillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".skill-fill").forEach(fill => skillFillObserver.observe(fill));


/* ═══════════════════════════════════════════════════════
   10. SKILL TABS FILTER
═══════════════════════════════════════════════════════ */
const skillTabs  = document.querySelectorAll(".skill-tab");
const skillCards = document.querySelectorAll(".skill-card");

skillTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    skillTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const cat = tab.dataset.category;
    skillCards.forEach(card => {
      const match = cat === "all" || card.dataset.category === cat;
      card.classList.toggle("hidden", !match);
      if (match) {
        // Re-trigger bar animation
        const fill = card.querySelector(".skill-fill");
        if (fill) {
          fill.style.width = "0%";
          setTimeout(() => { fill.style.width = fill.dataset.w + "%"; }, 50);
        }
      }
    });
  });
});


/* ═══════════════════════════════════════════════════════
   11. COUNT-UP ANIMATION
═══════════════════════════════════════════════════════ */
function countUp(el, target, duration = 1800) {
  let start     = 0;
  const step    = target / (duration / 16);
  const timer   = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (el.dataset.suffix || "");
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (el.dataset.suffix || "");
    }
  }, 16);
}

function startCountUps() {
  document.querySelectorAll("[data-count]").forEach(el => {
    countUp(el, parseInt(el.dataset.count));
  });
}

// Stats section counter on scroll
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      countUp(el, target, 2000);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll(".stat-card-num[data-target]").forEach(el => statsObserver.observe(el));

// Live stats simulation (update every few seconds)
function simulateLiveStats() {
  document.querySelectorAll(".stat-card-num[data-live='true']").forEach(el => {
    const base   = parseInt(el.dataset.target);
    const jitter = Math.floor(Math.random() * 6) - 2;
    el.dataset.target = Math.max(base + jitter, 1);
  });
}
setInterval(simulateLiveStats, 5000);


/* ═══════════════════════════════════════════════════════
   12. PROJECT CASE STUDIES
═══════════════════════════════════════════════════════ */
const projectsData = [
  {
    tag: "Portfolio / Web Design",
    title: "Modern Portfolio Website",
    desc: "A premium personal portfolio with advanced animations, interactive UI, and glassmorphism design built entirely with vanilla HTML, CSS, and JavaScript.",
    problem: "Most developer portfolios are generic, template-based, and fail to reflect the developer's true skill level. Recruiters see hundreds of similar portfolios and nothing stands out.",
    solution: "Built a fully custom portfolio from scratch with premium futuristic aesthetics — particle systems, smooth scroll reveals, glassmorphism cards, and an AI chatbot — making it genuinely memorable.",
    stack: ["HTML5", "CSS3", "JavaScript", "Canvas API", "Web Speech API"],
    features: [
      "Animated particle background with WebGL-like effects",
      "Multi-theme switcher (Dark, Cyberpunk, Neon, Hacker)",
      "AI chatbot with typing animation and voice synthesis",
      "Glassmorphism card design system",
      "Smooth scroll reveal animations on all sections",
      "Mobile-first fully responsive layout"
    ],
    learned: "This project pushed my CSS animation skills to the limit. I learned how to architect a large vanilla JS application cleanly, manage state without frameworks, and how design decisions dramatically affect user perception.",
    github: "#",
    demo: "#",
    emoji: "🌐",
    color: "linear-gradient(135deg,#00f5ff,#7c3aed)"
  },
  {
    tag: "AI / Chatbot",
    title: "AI Chat Bot Interface",
    desc: "An intelligent AI-powered chatbot with natural conversation flow, smart pre-trained responses, voice synthesis, and a sleek modern chat UI.",
    problem: "Existing chatbot UIs are either too complex (full backend required) or too basic. There was no lightweight, visually premium chatbot that could work purely on the frontend with smart responses.",
    solution: "Designed a fully client-side chatbot using JavaScript with a smart keyword-matching engine, typing animation, and Web Speech API for voice responses — zero backend needed.",
    stack: ["JavaScript", "Web Speech API", "CSS3 Animations", "Regex Matching"],
    features: [
      "Keyword-based intelligent response engine",
      "Realistic AI typing animation with variable speed",
      "Voice synthesis using SpeechSynthesis API",
      "Chat history with smooth scroll",
      "Quick suggestion chips for common queries",
      "Mobile-optimized chat window"
    ],
    learned: "I discovered the power of the Web Speech API and how surprisingly capable browser-native APIs are. The typing animation timing logic taught me a lot about JavaScript async patterns and user perception of 'intelligence'.",
    github: "#",
    demo: "#",
    emoji: "🤖",
    color: "linear-gradient(135deg,#00ffb3,#007cf0)"
  },
  {
    tag: "E-Commerce",
    title: "Local Super Store",
    desc: "Full-featured e-commerce website for a local supermarket with a full product catalog, cart system, product filtering, and responsive design optimized for mobile shoppers.",
    problem: "A local supermarket in Patna had no online presence. Customers couldn't browse products, check prices, or plan their shopping trips digitally, limiting reach and revenue.",
    solution: "Built a complete e-commerce frontend with dynamic product loading, category filtering, an add-to-cart system with localStorage persistence, and a clean mobile-first design.",
    stack: ["HTML5", "CSS3", "JavaScript", "localStorage", "Flexbox/Grid"],
    features: [
      "Dynamic product catalog with 50+ items",
      "Category filter (Grocery, Dairy, Snacks, etc.)",
      "Add to cart with real-time quantity updates",
      "Cart total calculation with GST",
      "localStorage cart persistence on reload",
      "Fully responsive mobile layout"
    ],
    learned: "Building a real-world e-commerce UI taught me the complexity behind seemingly simple features — cart state management, filter logic, and localStorage had more edge cases than expected. Client communication was also a key skill developed here.",
    github: "#",
    demo: "#",
    emoji: "🛒",
    color: "linear-gradient(135deg,#f59e0b,#ef4444)"
  },
  {
    tag: "Game / Canvas",
    title: "Endless Runner Game",
    desc: "A subway-surfer style endless runner game built from scratch with HTML5 Canvas and JavaScript — smooth physics, scoring system, obstacles, and animated sprites.",
    problem: "Browser games are often Flash-dependent or require game engines. I wanted to prove that a genuinely fun, polished game could be built using only native browser APIs.",
    solution: "Engineered a complete game loop using requestAnimationFrame, implemented collision detection, scrolling background, procedural obstacle generation, and a high-score system — all in pure JavaScript.",
    stack: ["HTML5 Canvas", "JavaScript", "requestAnimationFrame", "Collision Detection"],
    features: [
      "60fps smooth game loop with requestAnimationFrame",
      "Procedural obstacle generation with difficulty scaling",
      "Pixel-perfect collision detection",
      "Score system with localStorage high score",
      "Animated character sprites",
      "Mobile touch controls + keyboard support"
    ],
    learned: "Game development taught me how to think in terms of frames, delta time, and performance. Optimising the canvas render loop and understanding the game state machine were genuinely challenging and deeply rewarding problems to solve.",
    github: "#",
    demo: "#",
    emoji: "🎮",
    color: "linear-gradient(135deg,#8b5cf6,#ec4899)"
  }
];

const caseStudyOverlay = document.getElementById("caseStudyOverlay");
const caseStudyClose   = document.getElementById("caseStudyClose");
const caseStudyContent = document.getElementById("caseStudyContent");

window.openProject = function(idx) {
  const p = projectsData[idx];
  caseStudyContent.innerHTML = `
    <div class="cs-header">
      <span class="cs-tag">${p.tag}</span>
      <h2 class="cs-title">${p.title}</h2>
      <p class="cs-desc">${p.desc}</p>
    </div>

    <div class="cs-section">
      <div class="cs-section-title">Problem Statement</div>
      <p>${p.problem}</p>
    </div>

    <div class="cs-section">
      <div class="cs-section-title">Solution</div>
      <p>${p.solution}</p>
    </div>

    <div class="cs-section">
      <div class="cs-section-title">Tech Stack</div>
      <div class="cs-tech-stack">
        ${p.stack.map(t => `<span>${t}</span>`).join("")}
      </div>
    </div>

    <div class="cs-section">
      <div class="cs-section-title">Key Features</div>
      <ul class="cs-features">
        ${p.features.map(f => `<li>${f}</li>`).join("")}
      </ul>
    </div>

    <div class="cs-section">
      <div class="cs-section-title">What I Learned</div>
      <div class="cs-learned">"${p.learned}"</div>
    </div>

    <div class="cs-actions">
      <a href="${p.github}" target="_blank" class="btn btn-outline">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.55v-1.93c-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 2.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.07.78 2.15v3.19c0 .31.21.66.8.55C20.21 21.4 23.5 17.09 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>
        View on GitHub
      </a>
      <a href="${p.demo}" target="_blank" class="btn btn-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
        Live Demo
      </a>
    </div>
  `;
  caseStudyOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

caseStudyClose.addEventListener("click", closeCaseStudy);
caseStudyOverlay.addEventListener("click", e => {
  if (e.target === caseStudyOverlay) closeCaseStudy();
});

function closeCaseStudy() {
  caseStudyOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeCaseStudy();
});


/* ═══════════════════════════════════════════════════════
   13. REVIEWS SLIDER
═══════════════════════════════════════════════════════ */
const reviewsTrack = document.getElementById("reviewsTrack");
const revPrev      = document.getElementById("revPrev");
const revNext      = document.getElementById("revNext");
const revDotsWrap  = document.getElementById("revDots");

const reviewCards  = document.querySelectorAll(".review-card");
let   currentReview = 0;
const cardWidth     = 404; // card min-width + gap

// Build dots
reviewCards.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = "rev-dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => scrollToReview(i));
  revDotsWrap.appendChild(dot);
});

function scrollToReview(idx) {
  currentReview = Math.max(0, Math.min(idx, reviewCards.length - 1));
  reviewsTrack.scrollTo({ left: currentReview * cardWidth, behavior: "smooth" });
  document.querySelectorAll(".rev-dot").forEach((d, i) => d.classList.toggle("active", i === currentReview));
}

revNext.addEventListener("click", () => scrollToReview(currentReview + 1));
revPrev.addEventListener("click", () => scrollToReview(currentReview - 1));

// Drag to scroll
let isDragging = false, startX = 0, scrollLeft = 0;
reviewsTrack.addEventListener("mousedown",  e => { isDragging = true; startX = e.pageX - reviewsTrack.offsetLeft; scrollLeft = reviewsTrack.scrollLeft; reviewsTrack.style.cursor = "grabbing"; });
reviewsTrack.addEventListener("mouseleave", () => { isDragging = false; reviewsTrack.style.cursor = "grab"; });
reviewsTrack.addEventListener("mouseup",    () => { isDragging = false; reviewsTrack.style.cursor = "grab"; });
reviewsTrack.addEventListener("mousemove",  e => {
  if (!isDragging) return;
  e.preventDefault();
  reviewsTrack.scrollLeft = scrollLeft - (e.pageX - reviewsTrack.offsetLeft - startX) * 1.5;
});

// Auto-advance
setInterval(() => scrollToReview((currentReview + 1) % reviewCards.length), 5000);


/* ═══════════════════════════════════════════════════════
   14. APPOINTMENT / PLANS
═══════════════════════════════════════════════════════ */
const planCards       = document.querySelectorAll(".plan-card");
const selectedLabel   = document.getElementById("selectedPlanLabel");

planCards.forEach(card => {
  card.addEventListener("click", () => {
    planCards.forEach(p => p.classList.remove("plan-active"));
    card.classList.add("plan-active");
    const name  = card.querySelector(".plan-name").textContent.trim();
    const price = card.querySelector(".plan-price").textContent.replace(/\s+/g, " ").trim();
    selectedLabel.textContent = `${name} — ${price}`;
  });
});


/* ═══════════════════════════════════════════════════════
   15. UTR MODAL
═══════════════════════════════════════════════════════ */
const paidBtn    = document.getElementById("paidBtn");
const utrModal   = document.getElementById("utrModal");
const modalClose = document.getElementById("modalClose");
const utrInput   = document.getElementById("utrInput");
const utrCount   = document.getElementById("utrCount");
const verifyBtn  = document.getElementById("verifyBtn");
const utrError   = document.getElementById("utrError");

paidBtn.addEventListener("click",   () => openModal(utrModal));
modalClose.addEventListener("click",() => closeModal(utrModal));

utrInput.addEventListener("input", () => {
  utrInput.value = utrInput.value.replace(/\D/g, "");
  utrCount.textContent = `${utrInput.value.length}/12`;
  utrError.textContent = "";
});

verifyBtn.addEventListener("click", () => {
  if (utrInput.value.length !== 12) {
    utrError.textContent = "⚠ Please enter a valid 12-digit UTR number.";
    utrInput.focus();
    return;
  }
  utrError.textContent = "";
  closeModal(utrModal);
  setTimeout(() => {
    openModal(successModal);
    launchConfetti();
  }, 300);
});

/* ── Success Modal ── */
const successModal = document.getElementById("successModal");
const successClose = document.getElementById("successClose");
const whatsappBtn  = document.getElementById("whatsappBtn");

successClose.addEventListener("click", () => closeModal(successModal));

whatsappBtn.addEventListener("click", () => {
  const plan = selectedLabel ? selectedLabel.textContent : "Unknown Plan";
  const text = encodeURIComponent(
`👋 Hello Shivam!

I have completed the payment.

UTR Number: ${utrInput.value}
Selected Plan: ${plan}

Please verify and confirm my slot. 🙏`
  );
  window.open(`https://wa.me/919430932904?text=${text}`, "_blank");
});

function openModal(modal)  { modal.classList.add("active");    document.body.style.overflow = "hidden"; }
function closeModal(modal) { modal.classList.remove("active"); document.body.style.overflow = ""; }

// Close modals on overlay click
document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeModal(overlay);
  });
});


/* ═══════════════════════════════════════════════════════
   16. CONTACT FORM
═══════════════════════════════════════════════════════ */
const sendMsgBtn = document.getElementById("sendMsgBtn");

sendMsgBtn && sendMsgBtn.addEventListener("click", () => {
  const name    = document.getElementById("formName")?.value.trim();
  const email   = document.getElementById("formEmail")?.value.trim();
  const subject = document.getElementById("formSubject")?.value.trim();
  const msg     = document.getElementById("formMsg")?.value.trim();

  if (!name || !email || !msg) {
    showToast("⚠ Please fill all required fields.", "error");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("⚠ Please enter a valid email address.", "error");
    return;
  }

  const text = encodeURIComponent(
`👋 Hello Shivam!

📌 Name: ${name}
📧 Email: ${email}
${subject ? `📋 Subject: ${subject}\n` : ""}
💬 Message:
${msg}

Sent from your portfolio website.`
  );

  window.open(`https://wa.me/919430932904?text=${text}`, "_blank");
  showToast("✓ Opening WhatsApp!", "success");
});


/* ═══════════════════════════════════════════════════════
   17. DOWNLOAD CV
═══════════════════════════════════════════════════════ */
const downloadCV = document.getElementById("downloadCV");
downloadCV && downloadCV.addEventListener("click", e => {
  e.preventDefault();
  const link     = document.createElement("a");
  link.href      = "shivam cv.pdf";
  link.download  = "Shivam_Choudhary_CV.pdf";
  link.click();
  showToast("📄 Downloading CV...", "success");
});


/* ═══════════════════════════════════════════════════════
   18. CONFETTI
═══════════════════════════════════════════════════════ */
const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx    = confettiCanvas.getContext("2d");

function launchConfetti() {
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiCanvas.style.display = "block";

  const pieces = Array.from({ length: 200 }, () => ({
    x:  Math.random() * confettiCanvas.width,
    y:  Math.random() * confettiCanvas.height - confettiCanvas.height,
    w:  Math.random() * 10 + 4,
    h:  Math.random() * 6 + 3,
    dy: Math.random() * 3 + 2,
    dx: (Math.random() - 0.5) * 2,
    rot: Math.random() * 360,
    rotV: (Math.random() - 0.5) * 8,
    hue: Math.random() * 360
  }));

  let frame = 0;
  function draw() {
    frame++;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach(p => {
      p.y   += p.dy;
      p.x   += p.dx;
      p.rot += p.rotV;
      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rot * Math.PI / 180);
      confettiCtx.fillStyle = `hsla(${p.hue},100%,60%,0.9)`;
      confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      confettiCtx.restore();
    });
    if (frame < 200) requestAnimationFrame(draw);
    else confettiCanvas.style.display = "none";
  }
  draw();
}


/* ═══════════════════════════════════════════════════════
   19. TOAST NOTIFICATION
═══════════════════════════════════════════════════════ */
function showToast(message, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed; bottom:100px; left:50%; transform:translateX(-50%) translateY(20px);
    padding:14px 24px; border-radius:100px;
    background:${type === "success" ? "linear-gradient(135deg,var(--accent),var(--accent2))" : "linear-gradient(135deg,#ff4d6d,#ff8800)"};
    color:white; font-weight:600; font-size:0.88rem;
    z-index:999999; box-shadow:0 8px 30px rgba(0,0,0,0.4);
    transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
    font-family:'Space Grotesk',sans-serif;
    white-space:nowrap;
  `;

  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.transform = "translateX(-50%) translateY(0)"; toast.style.opacity = "1"; });
  setTimeout(() => {
    toast.style.transform = "translateX(-50%) translateY(20px)";
    toast.style.opacity   = "0";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}


/* ═══════════════════════════════════════════════════════
   20. AI CHATBOT
═══════════════════════════════════════════════════════ */
const chatbotFab   = document.getElementById("chatbotFab");
const chatWindow   = document.getElementById("chatWindow");
const chatClose    = document.getElementById("chatClose");
const chatInput    = document.getElementById("chatInput");
const chatSend     = document.getElementById("chatSend");
const chatVoice    = document.getElementById("chatVoice");
const chatMessages = document.getElementById("chatMessages");

let chatOpen    = false;
let voiceActive = false;
let isBotTyping = false;

chatbotFab.addEventListener("click", toggleChat);
chatClose.addEventListener("click",  toggleChat);

function toggleChat() {
  chatOpen = !chatOpen;
  chatWindow.classList.toggle("open", chatOpen);
  if (chatOpen) {
    chatInput.focus();
    // Remove ping once opened
    const ping = chatbotFab.querySelector(".fab-ping");
    if (ping) ping.style.display = "none";
  }
}

chatSend.addEventListener("click", handleChatSend);
chatInput.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleChatSend(); } });

function handleChatSend() {
  const msg = chatInput.value.trim();
  if (!msg || isBotTyping) return;
  appendMessage(msg, "user");
  chatInput.value = "";
  const reply = getBotReply(msg);
  showTypingAndReply(reply);
}

window.sendSuggestion = function(text) {
  if (isBotTyping) return;
  appendMessage(text, "user");
  const reply = getBotReply(text);
  showTypingAndReply(reply);
};

function appendMessage(text, sender) {
  const wrapper = document.createElement("div");
  wrapper.className = `chat-msg ${sender}-msg`;
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.innerHTML = text;
  wrapper.appendChild(bubble);
  chatMessages.appendChild(wrapper);
  scrollChatBottom();
  return bubble;
}

function showTypingAndReply(reply) {
  isBotTyping = true;

  // Typing indicator
  const typingWrapper = document.createElement("div");
  typingWrapper.className = "chat-msg bot-msg";
  typingWrapper.id = "typingIndicator";
  typingWrapper.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  chatMessages.appendChild(typingWrapper);
  scrollChatBottom();

  // Random typing delay based on reply length
  const delay = Math.min(800 + reply.length * 12, 3000);

  setTimeout(() => {
    typingWrapper.remove();
    const bubble = appendMessage("", "bot");

    // Typewriter effect for bot reply
    let i = 0;
    function typeChar() {
      if (i < reply.length) {
        bubble.innerHTML = reply.substring(0, ++i);
        scrollChatBottom();
        setTimeout(typeChar, 18);
      } else {
        isBotTyping = false;
        // Voice reply if active
        if (voiceActive) speakText(reply.replace(/<[^>]*>/g, ""));
      }
    }
    typeChar();
  }, delay);
}

function scrollChatBottom() {
  chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: "smooth" });
}

/* ── Bot Knowledge Base ── */
function getBotReply(input) {
  const msg = input.toLowerCase().trim();

  // About Shivam
  if (/\b(about|who is|shivam|tell me|introduce)\b/.test(msg)) {
    return `👨‍💻 <strong>Shivam Choudhary</strong> is a passionate Frontend Developer & Content Creator from Bihar, India.<br><br>
He specializes in building pixel-perfect, animated, AI-powered web experiences using HTML5, CSS3, and JavaScript.<br><br>
With 2+ years of experience, he's shipped 4+ projects and works with clients to bring digital ideas to life. 🚀`;
  }

  // Projects
  if (/\b(project|work|built|made|portfolio|store|game|chatbot|chat bot)\b/.test(msg)) {
    return `🗂 <strong>Shivam's Projects:</strong><br><br>
🌐 <strong>Modern Portfolio</strong> — This very site! Advanced animations & AI chatbot<br>
🤖 <strong>AI Chat Bot</strong> — Smart conversational UI with voice responses<br>
🛒 <strong>Local Super Store</strong> — Full e-commerce with cart & filtering<br>
🎮 <strong>Endless Runner Game</strong> — HTML5 Canvas game with physics<br><br>
Click <em>"Case Study"</em> on any project card for the full breakdown! 📂`;
  }

  // Skills
  if (/\b(skill|know|tech|stack|language|tool|use)\b/.test(msg)) {
    return `⚡ <strong>Shivam's Skill Stack:</strong><br><br>
🎨 <strong>Frontend:</strong> HTML5 (95%), CSS3 (90%), JavaScript ES6+ (85%), React (70%)<br>
📱 <strong>Design:</strong> UI/UX Design (80%), Figma & Canva (75%), Responsive Design (88%)<br>
🤖 <strong>AI & Tools:</strong> AI Integration (78%), Git/GitHub (80%)<br>
🎬 <strong>Creative:</strong> Video Editing (92%), Content Creation (85%)<br><br>
Check the Skills section for interactive progress bars! 📊`;
  }

  // Contact
  if (/\b(contact|reach|email|hire|phone|message|whatsapp)\b/.test(msg)) {
    return `📬 <strong>Contact Shivam:</strong><br><br>
📧 <strong>Email:</strong> officialshivamchoudhary2009@gmail.com<br>
📱 <strong>WhatsApp:</strong> +91 94xxxxxxx4<br>
📍 <strong>Location:</strong> Bihar, India 🇮🇳<br>
📸 <strong>Instagram:</strong> @svmmmk__<br>
✈️ <strong>Telegram:</strong> @shivamsera<br><br>
Use the Contact section form or just scroll down and send a message! 💬`;
  }

  // Experience
  if (/\b(experience|year|journey|story|background|start|began)\b/.test(msg)) {
    return `🚀 <strong>Shivam's Journey:</strong><br><br>
He started as a regular student with curiosity about screens and websites.<br><br>
📌 First learned video editing (CapCut, Alight Motion, VN Editor)<br>
📌 Discovered web development through YouTube in 2023<br>
📌 Built his first web project in 2024<br>
📌 Now building AI-powered tools and advanced frontend apps<br><br>
2+ years of self-taught experience. Still growing every day! 💪`;
  }

  // Currently working on
  if (/\b(current|now|working|building|learning|latest|recent)\b/.test(msg)) {
    return `⚡ <strong>Currently Active:</strong><br><br>
🤖 Building AI Tools — 72% done<br>
🌐 Exploring Three.js & WebGL — 38% done<br>
⚙️ Learning Node.js & Backend — 45% done<br>
🎨 UI/UX Experiments — 85% done<br>
⚛️ Leveling up React — 60% done<br>
🚀 Taking Freelance Projects — Always Open!<br><br>
Check the <em>"Currently Working On"</em> section for live progress! 📡`;
  }

  // Hire / availability
  if (/\b(hire|available|freelance|price|cost|rate|work together|collab)\b/.test(msg)) {
    return `✅ <strong>Yes! Shivam is Available for Work.</strong><br><br>
He takes on:<br>
🌐 Portfolio & Landing Pages<br>
🛒 E-Commerce Websites<br>
🤖 AI-Powered Web Apps<br>
🎬 Video Editing Projects<br><br>
💼 Book a consultation via the <strong>Booking section</strong> — starting at just <strong>₹50</strong>!<br><br>
Or email directly: officialshivamchoudhary2009@gmail.com 📧`;
  }

  // Achievements
  if (/\b(achievement|award|accomplish|proud|best)\b/.test(msg)) {
    return `🏆 <strong>Achievements:</strong><br><br>
⭐ 6 five-star client reviews<br>
🌍 Portfolio viewed in 23+ countries<br>
💼 4+ projects successfully shipped<br>
🤝 100+ appointment bookings<br>
🎬 Cinematic video content for YouTube creators<br>
🚀 Self-taught developer — no formal CS degree!<br><br>
Everything built through passion and persistence. 🔥`;
  }

  // Greeting
  if (/\b(hi|hello|hey|hola|namaste|sup|yo)\b/.test(msg)) {
    return `👋 <strong>Hey there!</strong> Welcome to Shivam's portfolio!<br><br>
I'm his AI assistant. I can tell you all about:<br>
<span class="chat-suggestion" onclick="sendSuggestion('Tell me about Shivam')">About Shivam</span>
<span class="chat-suggestion" onclick="sendSuggestion('Show projects')">Projects</span>
<span class="chat-suggestion" onclick="sendSuggestion('Skills?')">Skills</span>
<span class="chat-suggestion" onclick="sendSuggestion('Contact info')">Contact</span>
<span class="chat-suggestion" onclick="sendSuggestion('Currently working on?')">Live Work</span><br><br>
What would you like to know? 😊`;
  }

  // Thanks
  if (/\b(thanks|thank|great|awesome|cool|nice|good|amazing|wow)\b/.test(msg)) {
    return `😊 You're welcome! Glad I could help.<br><br>
If you want to work with Shivam, don't hesitate to reach out — he'd love to collaborate on your next project! 🚀<br><br>
Is there anything else you'd like to know?`;
  }

  // Default fallback
  return `🤔 Interesting question! I'm not sure I have a precise answer for that.<br><br>
Here are some things I <em>can</em> help with:<br>
<span class="chat-suggestion" onclick="sendSuggestion('Tell me about Shivam')">About Shivam</span>
<span class="chat-suggestion" onclick="sendSuggestion('Show projects')">Projects</span>
<span class="chat-suggestion" onclick="sendSuggestion('Skills?')">Skills</span>
<span class="chat-suggestion" onclick="sendSuggestion('Hire Shivam')">Hire</span><br><br>
Or scroll through the portfolio to explore! 👆`;
}

/* ── Voice Toggle ── */
chatVoice.addEventListener("click", () => {
  voiceActive = !voiceActive;
  chatVoice.classList.toggle("speaking", voiceActive);
  chatVoice.title = voiceActive ? "Voice ON — click to mute" : "Voice OFF — click to enable";
  if (!voiceActive) window.speechSynthesis?.cancel();
  showToast(voiceActive ? "🔊 Voice replies ON" : "🔇 Voice replies OFF");
});

function speakText(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const clean  = text.replace(/https?:\/\/[^\s]+/g, "").replace(/[*_~`#]/g, "").substring(0, 300);
  const utter  = new SpeechSynthesisUtterance(clean);
  utter.lang   = "en-IN";
  utter.rate   = 0.95;
  utter.pitch  = 1;
  utter.volume = 0.85;

  // Try to pick a natural-sounding voice
  const voices = window.speechSynthesis.getVoices();
  const pref   = voices.find(v => v.lang === "en-IN") ||
                 voices.find(v => v.lang.startsWith("en") && v.name.includes("Google")) ||
                 voices[0];
  if (pref) utter.voice = pref;

  window.speechSynthesis.speak(utter);
}

// Load voices async (Chrome requires this)
window.speechSynthesis?.addEventListener("voiceschanged", () => {
  window.speechSynthesis.getVoices();
});


/* ═══════════════════════════════════════════════════════
   21. PARALLAX ON SCROLL
═══════════════════════════════════════════════════════ */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  document.querySelectorAll(".hero-photo-ring").forEach((el, i) => {
    const dir = i === 0 ? 1 : -1;
    el.style.transform = `rotate(${scrollY * 0.06 * dir}deg)`;
  });
});


/* ═══════════════════════════════════════════════════════
   22. MAGNETIC BUTTONS
═══════════════════════════════════════════════════════ */
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x    = (e.clientX - rect.left - rect.width  / 2) * 0.2;
    const y    = (e.clientY - rect.top  - rect.height / 2) * 0.2;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});


/* ═══════════════════════════════════════════════════════
   23. RANDOM GLOW ON PROJECT CARDS
═══════════════════════════════════════════════════════ */
setInterval(() => {
  document.querySelectorAll(".project-card").forEach(card => {
    const intensity = (Math.random() * 20 + 5).toFixed(0);
    card.style.boxShadow = `0 0 ${intensity}px rgba(0,245,255,0.06)`;
  });
}, 2500);


/* ═══════════════════════════════════════════════════════
   24. SMOOTH ANCHOR SCROLL
═══════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});


/* ═══════════════════════════════════════════════════════
   25. INPUT GLOW FOCUS
═══════════════════════════════════════════════════════ */
document.querySelectorAll("input, textarea").forEach(input => {
  input.addEventListener("focus", () => {
    input.parentElement.style.transform = "scale(1.01)";
  });
  input.addEventListener("blur", () => {
    input.parentElement.style.transform = "scale(1)";
  });
});


/* ═══════════════════════════════════════════════════════
   26. PAGE VISIBILITY — PAUSE / RESUME
═══════════════════════════════════════════════════════ */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "Come back! 👀 — Shivam.dev";
  } else {
    document.title = "Shivam Choudhary — AI Frontend Engineer";
  }
});


/* ═══════════════════════════════════════════════════════
   27. INIT LOG
═══════════════════════════════════════════════════════ */
console.log(`%c
  ███████╗██╗  ██╗██╗██╗   ██╗ █████╗ ███╗   ███╗
  ██╔════╝██║  ██║██║██║   ██║██╔══██╗████╗ ████║
  ███████╗███████║██║██║   ██║███████║██╔████╔██║
  ╚════██║██╔══██║██║╚██╗ ██╔╝██╔══██║██║╚██╔╝██║
  ███████║██║  ██║██║ ╚████╔╝ ██║  ██║██║ ╚═╝ ██║
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝     ╚═╝

  🚀 Advanced Portfolio Loaded
  👨‍💻 Built by Shivam Choudhary
  📍 Bihar, India
  📧 officialshivamchoudhary2009@gmail.com
`, "color:#00f5ff;font-family:monospace;font-size:10px;");