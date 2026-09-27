/* =========================================================
   SHIVAM CHOUDHARY — PORTFOLIO
   payment.js — manual UPI payment + UTR confirmation flow
   ---------------------------------------------------------
   This is a front-end flow only. No payment is verified and
   no payment / UTR data is stored or transmitted anywhere.
   ========================================================= */

(function () {
  const SITE = window.SITE;
  if (!SITE) return;

  const grid = document.getElementById("payGrid");
  const empty = document.getElementById("payEmpty");

  const params = new URLSearchParams(window.location.search);
  const key = params.get("service");
  const service = key ? SITE.services[key] : null;

  /* No valid service in the URL — show a calm fallback. */
  if (!service) {
    if (grid) grid.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }

  /* ---- Fill in the selected service ---- */
  const serviceEl = document.getElementById("payService");
  const amountEl = document.getElementById("payAmount");
  if (serviceEl) serviceEl.textContent = service.name;
  if (amountEl) amountEl.textContent = money(service.price);

  const scan = document.getElementById("payScan");
  const confirmCard = document.getElementById("payConfirm");
  const celebrate = document.getElementById("celebrate");
  const completedBtn = document.getElementById("completedBtn");
  const utrForm = document.getElementById("utrForm");
  const utrInput = document.getElementById("utr");
  const utrHelp = document.getElementById("utrHelp");
  const utrSubmit = utrForm?.querySelector('button[type="submit"]');
  const final = document.getElementById("payFinal");
  const waConfirm = document.getElementById("waConfirm");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Step 1 → Step 2 with a subtle celebration ---- */
  completedBtn?.addEventListener("click", () => {
    completedBtn.disabled = true;
    if (celebrate) celebrate.hidden = false;

    window.setTimeout(() => {
      if (celebrate) celebrate.hidden = true;
      if (scan) scan.hidden = true;
      if (confirmCard) {
        confirmCard.hidden = false;
        confirmCard.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
      window.setTimeout(() => utrInput?.focus(), reduceMotion ? 0 : 350);
    }, reduceMotion ? 200 : 1650);
  });

  /* ---- UTR validation + WhatsApp hand-off ---- */
  utrForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = (utrInput?.value || "").trim();
    const valid = value.length >= 6 && value.length <= 40 && /^[A-Za-z0-9]+$/.test(value);

    if (!valid) {
      utrInput?.classList.add("is-invalid");
      utrHelp?.classList.add("is-error");
      if (utrHelp) utrHelp.textContent = "Please enter a valid UTR / reference number (letters and numbers only).";
      utrInput?.focus();
      return;
    }

    utrInput.classList.remove("is-invalid");
    utrHelp?.classList.remove("is-error");

    const message = [
      "Hi Shivam, I have completed the payment for your service.",
      "",
      `Service: ${service.name}`,
      `Amount: ${money(service.price)}`,
      `UTR / Reference: ${value}`,
      "",
      "Please confirm my payment manually. Thank you!"
    ].join("\n");

    if (waConfirm) waConfirm.href = waLink(message);

    utrInput.disabled = true;
    if (utrSubmit) utrSubmit.disabled = true;
    if (final) {
      final.hidden = false;
      final.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }
  });
})();
