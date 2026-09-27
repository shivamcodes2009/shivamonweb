/* =========================================================
   SHIVAM CHOUDHARY — PORTFOLIO
   work.js — renders services & pricing from the SITE config
   ========================================================= */

(function () {
  const list = document.getElementById("workList");
  if (!list || !window.SITE) return;

  const SITE = window.SITE;

  const wrappers = {
    frontend: { cat: "Development", desc: "Responsive, accessible interfaces built with HTML, CSS and JavaScript." },
    backend: { cat: "Development", desc: "Reliable server-side logic, APIs and clean data handling." },
    "video-editing": { cat: "Creative", desc: "Clean cuts, pacing and polish for your footage." },
    "content-creation": { cat: "Creative", desc: "Ideas, scripts and creative assets that connect." },
    "motion-graphics": { cat: "Creative", desc: "Subtle animation and visual storytelling." }
  };

  const services = Object.entries(SITE.services).map(([key, service]) => ({
    key,
    kind: "enroll",
    name: service.name,
    cat: wrappers[key]?.cat || "Development",
    desc: wrappers[key]?.desc || "",
    oldPrice: service.oldPrice,
    price: service.price
  }));

  const inquiries = Object.entries(SITE.inquiries).map(([key, service]) => ({
    key,
    kind: "whatsapp",
    name: service.name,
    cat: wrappers[key]?.cat || "Creative",
    desc: wrappers[key]?.desc || ""
  }));

  const items = [...services, ...inquiries];
  const pad = (n) => String(n).padStart(2, "0");

  list.innerHTML = items
    .map((item, i) => {
      const priceBlock =
        item.kind === "enroll"
          ? `<div class="work-price">
               <s>${money(item.oldPrice)}</s>
               <span class="now">${money(item.price)}</span>
             </div>`
          : `<div class="work-price">
               <span class="quote">Quoted on WhatsApp</span>
             </div>`;

      const action =
        item.kind === "enroll"
          ? `<a class="btn btn-primary" href="payment.html?service=${item.key}">Let&rsquo;s Enroll</a>`
          : `<a class="btn btn-ghost" target="_blank" rel="noopener"
               href="${waLink(`Hi Shivam, I'd like to know the price for ${item.name}. Please share the details.`)}">
               See Price via WhatsApp
             </a>`;

      return `
        <article class="work-item reveal">
          <span class="work-index">${pad(i + 1)}</span>
          <div class="work-meta">
            <p class="work-cat">${item.cat}</p>
            <h3 class="work-name">${item.name}</h3>
            <p class="work-desc">${item.desc}</p>
          </div>
          ${priceBlock}
          <div class="work-action">${action}</div>
        </article>`;
    })
    .join("");
})();
