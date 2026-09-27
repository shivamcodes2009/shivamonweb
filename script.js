/* =========================================================
   SHIVAM CHOUDHARY — PORTFOLIO
   script.js — configuration, shared UI, and the AI assistant
   ---------------------------------------------------------
   Everything editable lives in the SITE config object below.
   ========================================================= */

/* =========================================================
   >>>>>>>>>>  CONFIGURATION — EDIT HERE  <<<<<<<<<<
   ========================================================= */
const SITE = {
  name: "Shivam Choudhary",
  location: "Madhubani, Bihar, India",

  /* Contact */
  whatsapp: "919430932904", // country code + number, no spaces or +
  instagram: "https://www.instagram.com/svmmm.k?stkn=MTN6NGkxdzBrdG04dw==",
  telegram: "https://t.me/x05ukz",
  github: "YOUR_GITHUB_URL_HERE", // replace with your real GitHub URL

  /* Assets — keep these filenames when replacing */
  profileImage: "profile.png",
  qrImage: "qr.png",
  cvFile: "cv.jpg",

  currency: "\u20B9",

  /* Frontend / Backend services (payment flow) */
  services: {
    frontend: { name: "Frontend Development", oldPrice: 19000, price: 10000 },
    backend: { name: "Backend Development", oldPrice: 17000, price: 7500 }
  },

  /* Services that ask for pricing on WhatsApp */
  inquiries: {
    "video-editing": { name: "Video Editing" },
    "content-creation": { name: "Content Creation" },
    "motion-graphics": { name: "Motion Graphics" }
  },

  /* Appointment plans */
  plans: {
    basic: { name: "Basic", oldPrice: 100, price: 49 },
    medium: { name: "Medium", oldPrice: 300, price: 199 },
    high: { name: "High", oldPrice: 800, price: 599 }
  }
};

window.SITE = SITE;

/* =========================================================
   Helpers
   ========================================================= */
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

const money = (value) => SITE.currency + Number(value).toLocaleString("en-IN");

const waLink = (message) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

const githubReady = () =>
  typeof SITE.github === "string" &&
  SITE.github.startsWith("http") &&
  !SITE.github.includes("YOUR_GITHUB");

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

/* =========================================================
   Toast
   ========================================================= */
let toastTimer = null;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}
window.showToast = showToast;

/* =========================================================
   Config wiring — links, assets, prices, year
   ========================================================= */
function applyConfig() {
  $$("[data-social]").forEach((el) => {
    const key = el.getAttribute("data-social");
    if (key === "instagram") el.setAttribute("href", SITE.instagram);
    if (key === "telegram") el.setAttribute("href", SITE.telegram);
    if (key === "github") {
      if (githubReady()) {
        el.setAttribute("href", SITE.github);
        el.setAttribute("target", "_blank");
      } else {
        el.setAttribute("href", "#");
        el.setAttribute("aria-disabled", "true");
        el.removeAttribute("target");
        el.addEventListener("click", (e) => {
          e.preventDefault();
          showToast("GitHub link coming soon.");
        });
      }
    }
  });

  $$("[data-cv]").forEach((el) => {
    el.setAttribute("href", SITE.cvFile);
    el.setAttribute("download", "Shivam-Choudhary-CV.jpg");
  });

  $$('[data-config-img="profile"]').forEach((img) => {
    if (img.getAttribute("src") !== SITE.profileImage) img.setAttribute("src", SITE.profileImage);
  });
  $$('[data-config-img="qr"]').forEach((img) => {
    if (img.getAttribute("src") !== SITE.qrImage) img.setAttribute("src", SITE.qrImage);
  });

  $$("[data-price]").forEach((el) => {
    const plan = SITE.plans[el.getAttribute("data-price")];
    if (plan) el.textContent = money(plan.price);
  });
  $$("[data-price-old]").forEach((el) => {
    const plan = SITE.plans[el.getAttribute("data-price-old")];
    if (plan) el.textContent = money(plan.oldPrice);
  });
  $$("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* =========================================================
   Navigation
   ========================================================= */
function initNavigation() {
  const nav = $("#siteNav");
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  const close = $("#navClose");

  if (nav) {
    const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (!toggle || !links) return;

  const setOpen = (open) => {
    links.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(!links.classList.contains("is-open")));
  close?.addEventListener("click", () => setOpen(false));
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("is-open")) setOpen(false);
  });
  document.body.addEventListener("click", (e) => {
    if (
      document.body.classList.contains("menu-open") &&
      !links.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      setOpen(false);
    }
  });

  initActiveLink(links);
}

function initActiveLink(links) {
  const ids = ["home", "skills", "projects", "story", "appointment"];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;

  const linkFor = (id) =>
    links.querySelector(`a[href*="#${id}"]`) || null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.querySelectorAll("a").forEach((a) => a.classList.remove("is-active"));
        const active = linkFor(entry.target.id);
        if (active) active.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));
}

/* =========================================================
   Reveal on scroll
   ========================================================= */
function initReveal() {
  const items = $$(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(el.parentElement?.children || []).filter((c) =>
          c.classList.contains("reveal")
        );
        const index = Math.min(siblings.indexOf(el), 7);
        el.style.transitionDelay = `${index * 70}ms`;
        el.classList.add("is-visible");
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

/* =========================================================
   Misc interactive bits
   ========================================================= */
function initMisc() {
  $$("[data-soon]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-soon") || "This project";
      showToast(`${name} is still in progress — details coming soon.`);
    });
  });

  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });
}

/* =========================================================
   AI Assistant — lightweight, rule-based demo
   ========================================================= */
function initAssistant() {
  const root = $("#assistant");
  if (!root) return;

  const launch = $("#assistantLaunch");
  const panel = $("#assistantPanel");
  const close = $("#assistantClose");
  const body = $("#assistantBody");
  const form = $("#assistantForm");
  const field = $("#assistantField");
  const quick = $("#assistantQuick");

  let started = false;

  const scrollDown = () => { body.scrollTop = body.scrollHeight; };

  function addMessage(html, who = "bot") {
    const el = document.createElement("div");
    el.className = `msg msg-${who}`;
    el.innerHTML = html;
    body.appendChild(el);
    scrollDown();
    return el;
  }

  function botSay(html) {
    const typing = document.createElement("div");
    typing.className = "msg msg-bot";
    typing.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
    body.appendChild(typing);
    scrollDown();
    const delay = 420 + Math.min(html.length * 4, 700);
    setTimeout(() => {
      typing.remove();
      addMessage(html, "bot");
    }, delay);
  }

  const link = (href, label) => `<a href="${href}">${label}</a>`;

  const replies = {
    skills: () =>
      `Shivam works across <strong>10 core skills</strong>: HTML5, CSS3, JavaScript, UI/UX Design, AI Tool Integration, Video Editing, Content Creation, Git, GitHub and Responsive Design.<br>${link("index.html#skills", "See the full skill set")}.`,
    projects: () =>
      `He is currently building four projects:<br>&bull; <strong>AI Chatbot</strong><br>&bull; <strong>Ancient Mithila</strong><br>&bull; <strong>NOVRA</strong><br>&bull; <strong>Gym Website</strong><br>${link("index.html#projects", "View projects in motion")}.`,
    work: () =>
      `Frontend Development starts at <strong>${money(SITE.services.frontend.price)}</strong> and Backend Development at <strong>${money(SITE.services.backend.price)}</strong>. Video Editing, Content Creation and Motion Graphics are quoted on WhatsApp.<br>${link("work.html", "See services &amp; pricing")}.`,
    appointment: () =>
      `You can book a session in three tiers — Basic ${money(SITE.plans.basic.price)}, Medium ${money(SITE.plans.medium.price)} or High ${money(SITE.plans.high.price)}.<br>${link("index.html#appointment", "Choose an appointment")}.`,
    contact: () =>
      `Let's talk:<br>&bull; WhatsApp <a href="${waLink("Hi Shivam, I'd like to get in touch.")}" target="_blank" rel="noopener">9430932904</a><br>&bull; Instagram <a href="${SITE.instagram}" target="_blank" rel="noopener">svmmm.k</a><br>&bull; Telegram <a href="${SITE.telegram}" target="_blank" rel="noopener">x05ukz</a>`,
    story: () =>
      `Shivam is a student and self-taught developer from Madhubani, Bihar. He learned through free courses and tutorials, and is still building and improving one project at a time.<br>${link("index.html#story", "Read his story")}.`,
    cv: () =>
      `Sure — you can download his CV here: ${link(SITE.cvFile, "Download CV")}.`,
    price: () => replies.work(),
    location: () =>
      `Shivam is based in <strong>${SITE.location}</strong>, and works with people everywhere.`,
    greeting: () =>
      `Hey! Nice to meet you. I can help with <strong>skills</strong>, <strong>projects</strong>, <strong>pricing</strong>, <strong>appointments</strong> or <strong>contact</strong> details.`,
    thanks: () => `Anytime! Anything else you'd like to explore?`,
    fallback: () =>
      `I'm a simple assistant, so I might have missed that. Try asking about <strong>skills</strong>, <strong>projects</strong>, <strong>pricing</strong>, <strong>appointments</strong> or <strong>contact</strong>.`
  };

  function resolve(text) {
    const t = text.toLowerCase();
    const has = (...words) => words.some((w) => t.includes(w));

    if (has("skill", "tech", "stack", "tools")) return replies.skills();
    if (has("project", "work", "portfolio", "built", "building")) return replies.projects();
    if (has("price", "pricing", "cost", "rate", "charge", "budget")) return replies.price();
    if (has("hire", "enroll", "service", "freelance", "collab", "work with")) return replies.work();
    if (has("appointment", "meeting", "book", "session", "call", "plan")) return replies.appointment();
    if (has("contact", "whatsapp", "instagram", "telegram", "reach", "mail", "email")) return replies.contact();
    if (has("cv", "resume")) return replies.cv();
    if (has("story", "about", "who is", "yourself", "background")) return replies.story();
    if (has("where", "location", "city", "from", "based")) return replies.location();
    if (has("hi", "hello", "hey", "yo", "namaste")) return replies.greeting();
    if (has("thank", "thanks", "thx")) return replies.thanks();
    return replies.fallback();
  }

  function open() {
    panel.hidden = false;
    launch.setAttribute("aria-expanded", "true");
    if (!started) {
      started = true;
      addMessage(
        `Hey! I'm Shivam's AI assistant. How can I help you explore his work?`,
        "bot"
      );
    }
    setTimeout(() => field?.focus(), 120);
  }

  function shut() {
    panel.hidden = true;
    launch.setAttribute("aria-expanded", "false");
  }

  launch.addEventListener("click", () => (panel.hidden ? open() : shut()));
  close?.addEventListener("click", shut);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) shut();
  });

  quick?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-quick]");
    if (!btn) return;
    const key = btn.getAttribute("data-quick");
    addMessage(escapeHtml(btn.textContent.trim()), "user");
    botSay(replies[key] ? replies[key]() : replies.fallback());
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = field.value.trim();
    if (!value) return;
    addMessage(escapeHtml(value), "user");
    field.value = "";
    botSay(resolve(value));
  });
}

/* =========================================================
   Boot
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initNavigation();
  initReveal();
  initMisc();
  initAssistant();
});
