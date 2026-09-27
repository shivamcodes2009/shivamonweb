/* =========================================================
   SHIVAM CHOUDHARY — PORTFOLIO
   appointment.js — selected plan → WhatsApp confirmation
   ========================================================= */

(function () {
  const SITE = window.SITE;
  if (!SITE) return;

  const wrap = document.getElementById("apptWrap");
  const empty = document.getElementById("apptEmpty");

  const params = new URLSearchParams(window.location.search);
  const key = params.get("plan");
  const plan = key ? SITE.plans[key] : null;

  /* No valid plan in the URL — show a calm fallback. */
  if (!plan) {
    if (wrap) wrap.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }

  const planEl = document.getElementById("apptPlan");
  const oldEl = document.getElementById("apptOld");
  const amountEl = document.getElementById("apptAmount");
  const confirm = document.getElementById("apptConfirm");

  if (planEl) planEl.textContent = plan.name;
  if (oldEl) oldEl.textContent = money(plan.oldPrice);
  if (amountEl) amountEl.textContent = money(plan.price);

  const message = [
    "Hi Shivam, I'd like to confirm an appointment.",
    "",
    `Plan: ${plan.name}`,
    `Price: ${money(plan.price)}`,
    "",
    "Please let me know the available times and next steps. Thank you!"
  ].join("\n");

  if (confirm) confirm.href = waLink(message);
})();
