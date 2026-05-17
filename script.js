/* ══════════════════════════════════════════════════
   SHIVAM CHOUDHARY — PORTFOLIO SCRIPT
   Loader | Particles | Cursor | Nav | Modals | Confetti
   ══════════════════════════════════════════════════ */

/* ── 1. LOADER ────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1800);
});

/* ── 2. PARTICLES ─────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.r  = Math.random() * 1.5 + 0.3;
    this.dx = (Math.random() - 0.5) * 0.3;
    this.dy = (Math.random() - 0.5) * 0.3;
    this.a  = Math.random();
    const hue = Math.random() > 0.5 ? '185' : '270';
    this.color = `hsla(${hue}, 100%, 70%, `;
  }

  for (let i = 0; i < 100; i++) particles.push(new Particle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.a + ')';
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,245,255,${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── 3. CUSTOM CURSOR ─────────────────────────────── */
(function initCursor() {
  const dot      = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let fx = 0, fy = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animFollower);
  })();
})();

/* ── 4. NAVBAR SCROLL ─────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── 5. HAMBURGER MENU ────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose   = document.getElementById('menuClose');

function openMenu() {
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('show');
  hamburger.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('show');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

// Close on link click
document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeMenu);
});

/* ── 6. TYPING ANIMATION ──────────────────────────── */
(function typewriter() {
  const roles = [
    'Frontend Developer',
    'UI/UX Enthusiast',
    'Content Creator',
    'Video Editor',
    'AI Tools Explorer'
  ];
  const el   = document.getElementById('roleText');
  let rIdx   = 0, cIdx = 0, deleting = false;

  function type() {
    const current = roles[rIdx];
    if (!deleting) {
      el.textContent = current.slice(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        rIdx = (rIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  setTimeout(type, 1200);
})();

/* ── 7. DOWNLOAD CV ───────────────────────────────── */
document.getElementById('downloadCV').addEventListener('click', e => {
  e.preventDefault();

  // Create a minimal text "CV" file for download
  const cvContent = `SHIVAM CHOUDHARY
Frontend Developer | Content Creator | Video Editor
========================================================

CONTACT
Email   : officialshivamchoudhary2009@gmail.com
Phone   : +91 9430932904
GitHub  : github.com/
Instagram: instagram.com/svmmmk__
Telegram : t.me/shivamsera

ABOUT ME
Passionate Frontend Developer with expertise in HTML, CSS, JavaScript,
and modern UI/UX design. I create beautiful, responsive, user-centric
websites. Skilled in video editing (CapCut, Alight Motion, After Effects,
VN Editor) and content creation. Actively leverage AI tools for enhanced
development workflows.

SKILLS
- HTML5, CSS3, JavaScript (ES6+)
- Responsive Design, UI/UX Design
- React Basics, Tailwind CSS
- Video Editing (CapCut, Alight Motion, After Effects)
- Content Creation, AI Tools Integration
- Figma, Canva, Git & GitHub
- Performance Optimization

PROJECTS
1. Modern Portfolio       – Premium portfolio with advanced animations
2. AI Chat Bot            – Intelligent chatbot with modern interface
3. Local Super Store      – E-commerce site with cart & filtering
4. Endless Runner Game    – HTML5 Canvas game (subway surfer style)

EDUCATION
Student | Aspiring Developer | Self-taught
Bihar, India

========================================================
"Turning ideas into stunning digital experiences."
`;

  const blob = new Blob([cvContent], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'Shivam_Choudhary_CV.txt';
  a.click();
  URL.revokeObjectURL(url);
});

/* ── 8. SCROLL REVEAL ─────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when skills section becomes visible
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

/* ── 9. APPOINTMENT MODAL ─────────────────────────── */
const utrModal    = document.getElementById('utrModal');
const successModal= document.getElementById('successModal');
const paidBtn     = document.getElementById('paidBtn');
const modalClose  = document.getElementById('modalClose');
const verifyBtn   = document.getElementById('verifyBtn');
const utrInput    = document.getElementById('utrInput');
const utrError    = document.getElementById('utrError');
const whatsappBtn = document.getElementById('whatsappBtn');

let currentUTR = '';

paidBtn.addEventListener('click', () => {
  utrInput.value = '';
  utrError.textContent = '';
  utrModal.classList.add('show');
});

modalClose.addEventListener('click', () => utrModal.classList.remove('show'));
utrModal.addEventListener('click', e => {
  if (e.target === utrModal) utrModal.classList.remove('show');
});

// Only allow numbers
utrInput.addEventListener('input', () => {
  utrInput.value = utrInput.value.replace(/\D/g, '').slice(0, 12);
  utrError.textContent = '';
});

verifyBtn.addEventListener('click', () => {
  const val = utrInput.value.trim();
  if (val.length !== 12) {
    utrError.textContent = '⚠ Please enter a valid 12-digit UTR number.';
    utrInput.style.borderColor = '#ef4444';
    setTimeout(() => (utrInput.style.borderColor = ''), 1500);
    return;
  }
  currentUTR = val;
  utrModal.classList.remove('show');
  setTimeout(() => {
    successModal.classList.add('show');
    launchConfetti();
  }, 200);
});

// Close success modal on outside click
successModal.addEventListener('click', e => {
  if (e.target === successModal) successModal.classList.remove('show');
});

// WhatsApp verify button
whatsappBtn.addEventListener('click', () => {
  const msg = encodeURIComponent(
    `Hi, I have paid for the appointment. My UTR is ${currentUTR}. Please verify. - Shivam Choudhary`
  );
  window.open(`https://wa.me/919430932904?text=${msg}`, '_blank');
  successModal.classList.remove('show');
});

/* ── 10. CONFETTI ─────────────────────────────────── */
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx    = canvas.getContext('2d');
  canvas.style.display = 'block';
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors  = ['#00f5ff', '#7c3aed', '#a855f7', '#00c8d7', '#ffffff', '#fbbf24'];
  const pieces  = [];
  const count   = 160;

  for (let i = 0; i < count; i++) {
    pieces.push({
      x     : Math.random() * canvas.width,
      y     : -20 - Math.random() * 200,
      w     : Math.random() * 10 + 5,
      h     : Math.random() * 5 + 3,
      color : colors[Math.floor(Math.random() * colors.length)],
      angle : Math.random() * Math.PI * 2,
      spin  : (Math.random() - 0.5) * 0.3,
      vx    : (Math.random() - 0.5) * 4,
      vy    : Math.random() * 3 + 2,
      alpha : 1
    });
  }

  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.x     += p.vx;
      p.y     += p.vy;
      p.angle += p.spin;
      p.vy    += 0.08;
      if (p.y > canvas.height * 0.7) p.alpha -= 0.015;
      if (p.alpha > 0) alive = true;
    });
    if (alive) { frame = requestAnimationFrame(draw); }
    else {
      canvas.style.display = 'none';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  if (frame) cancelAnimationFrame(frame);
  draw();
}

/* ── 11. PROJECT CARD 3D TILT ─────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `
      perspective(600px)
      rotateY(${x * 12}deg)
      rotateX(${-y * 12}deg)
      translateY(-8px)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => (card.style.transition = ''), 500);
  });
});

/* ── 12. SMOOTH SCROLL for anchor links ───────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 13. ACTIVE NAV STATE ─────────────────────────── */
(function activeNav() {
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    document.querySelectorAll('.menu-link').forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--cyan)';
      }
    });
  });
})();