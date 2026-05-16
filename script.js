gsap.registerPlugin(ScrollTrigger);

/* ===== SKILLS ===== */
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

let lineIndex = 0;
let charIndex = 0;
let deleting = false;

const typingEl = document.getElementById("typing");

function typeEffect() {

  const current = lines[lineIndex];

  if (!deleting) {

    typingEl.textContent =
      current.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === current.length) {

      deleting = true;

      setTimeout(typeEffect, 1500);

      return;
    }

  } else {

    typingEl.textContent =
      current.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {

      deleting = false;

      lineIndex =
        (lineIndex + 1) % lines.length;
    }
  }

  setTimeout(typeEffect, deleting ? 30 : 50);
}

/* ===== LOADER ===== */

let progress = 0;

const fill =
  document.getElementById("loaderFill");

const pct =
  document.getElementById("loaderPercent");

const loader =
  document.getElementById("loader");

const interval = setInterval(() => {

  progress++;

  fill.style.width = progress + "%";

  pct.textContent = progress + "%";

  if (progress >= 100) {

    clearInterval(interval);

    setTimeout(() => {

      gsap.to(loader, {
        opacity: 0,
        duration: .8,

        onComplete: () => {

          loader.style.display = "none";

          loadSkills();

          startHeroAnim();

          typeEffect();

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
    stagger: .1,
    ease: "power3.out"

  });

  gsap.from(".hero-right", {

    x: 60,
    opacity: 0,
    duration: 1.1,
    delay: .2

  });
}

/* ===== REVEAL ===== */

gsap.utils.toArray(".reveal").forEach(el => {

  gsap.fromTo(el,

    {
      opacity: 0,
      y: 60
    },

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

/* ===== PROJECTS ===== */

gsap.utils.toArray(".project-card").forEach(card => {

  gsap.fromTo(card,

    {
      y: 60,
      opacity: 0
    },

    {
      y: 0,
      opacity: 1,
      duration: .8,
      ease: "power3.out",

      scrollTrigger: {
        trigger: card,
        start: "top 90%"
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

  scale: .9,
  opacity: 0,
  duration: .6,
  stagger: .1

});

/* ===== NAVBAR ===== */

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(".nav-link");

const navbar =
  document.getElementById("navbar");

window.addEventListener("scroll", () => {

  navbar.classList.toggle(
    "scrolled",
    window.scrollY > 50
  );

  let current = "";

  sections.forEach(sec => {

    if (window.scrollY >= sec.offsetTop - 200) {

      current = sec.id;
    }
  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") === `#${current}`
    ) {

      link.classList.add("active");
    }
  });

});

/* ===== MOBILE MENU ===== */

document.getElementById("menuBtn").onclick = () => {

  document
    .getElementById("mobileMenu")
    .classList.add("open");
};

document.getElementById("mobileClose").onclick = () => {

  document
    .getElementById("mobileMenu")
    .classList.remove("open");
};

document.querySelectorAll(".mob-link")
.forEach(link => {

  link.addEventListener("click", () => {

    document
      .getElementById("mobileMenu")
      .classList.remove("open");

  });

});

/* ===== EMAIL ===== */

function showEmail() {

  const box =
    document.getElementById("emailBox");

  box.style.display =
    box.style.display === "block"
      ? "none"
      : "block";
}

/* ===== PAYMENT ===== */

const paymentModal =
  document.getElementById("paymentModal");

const successPopup =
  document.getElementById("successPopup");

const utrArea =
  document.getElementById("utrArea");

const bankLoader =
  document.getElementById("bankLoader");

const verifyBtn =
  document.getElementById("verifyBtn");

const paidBtn =
  document.getElementById("paidBtn");

let savedUTR = "";
let verifying = false;

/* OPEN */

function openPayment() {

  paymentModal.classList.add("show");
}

/* CLOSE */

function closePayment() {

  paymentModal.classList.remove("show");
}

paymentModal.addEventListener("click", e => {

  if (e.target === e.currentTarget) {

    closePayment();
  }

});

/* SHOW UTR */

function showUTR() {

  utrArea.style.display = "block";

  paidBtn.disabled = true;
}

/* VERIFY */

function verifyPayment() {

  if (verifying) return;

  const utr =
    document.getElementById("utrInput")
    .value
    .trim();

  /* UTR VALIDATION */

  const utrRegex = /^[0-9]{12}$/;

  if (!utrRegex.test(utr)) {

    const input =
      document.getElementById("utrInput");

    input.classList.add("shake");

    setTimeout(() => {

      input.classList.remove("shake");

    }, 400);

    alert(
      "Enter valid 12 digit UTR number"
    );

    return;
  }

  verifying = true;

  verifyBtn.disabled = true;

  savedUTR = utr;

  /* SHOW BANK LOADER */

  bankLoader.style.display = "block";

  let progress = 0;

  const fill =
    document.getElementById(
      "bankProgressFill"
    );

  const step1 =
    document.getElementById("step1");

  const step2 =
    document.getElementById("step2");

  const step3 =
    document.getElementById("step3");

  const loaderInterval = setInterval(() => {

    progress += 4;

    fill.style.width = progress + "%";

    if (progress >= 20)
      step1.classList.add("active");

    if (progress >= 60)
      step2.classList.add("active");

    if (progress >= 90)
      step3.classList.add("active");

    if (progress >= 100) {

      clearInterval(loaderInterval);

      /* SUCCESS FLOW */

      setTimeout(() => {

        closePayment();

        bankLoader.style.display = "none";

        verifyBtn.disabled = false;

        verifying = false;

        /* SOUND */

        const sound =
          document.getElementById("successSound");

        sound.currentTime = 0;

        sound.play();

        /* VIBRATION */

        if (navigator.vibrate) {

          navigator.vibrate([200, 100, 200]);
        }

        /* CONFETTI */

        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.6 }
        });

        /* SHOW SUCCESS */

        successPopup.classList.add("show");

      }, 500);
    }

  }, 120);

}

/* WHATSAPP */

function goWhatsApp() {

  const phone = "919430932904";

  const msg =
`🔥 Appointment Payment Successful

👤 Name: Website Visitor
💸 Amount: ₹50
🆔 UTR: ${savedUTR}

✅ Payment Verified Successfully

Please confirm my appointment slot.`;

  window.open(

    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,

    "_blank"

  );

}

/* CLOSE SUCCESS */

successPopup.addEventListener("click", e => {

  if (e.target === e.currentTarget) {

    successPopup.classList.remove("show");
  }

});