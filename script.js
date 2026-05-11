const skills = ["HTML","CSS","JavaScript","GitHub","Python","AI Tools"];
const grid = document.getElementById("skillsGrid");

skills.forEach(s=>{
  let div = document.createElement("div");
  div.className = "skill-card";
  div.textContent = s;
  grid.appendChild(div);
});

/* typing effect */
let text = "Building modern AI-powered websites...";
let i = 0;

function type(){
  if(i < text.length){
    document.getElementById("typing").textContent += text[i++];
    setTimeout(type,50);
  }
}
type();

/* hire */
function hireMe(){
  alert("Thanks! I will contact you soon.");
}

/* chatbot (API ready) */
function sendMessage(){
  let input = document.getElementById("userInput");
  let chat = document.getElementById("chatBox");

  let msg = input.value;
  if(!msg) return;

  chat.innerHTML += `<p><b>You:</b> ${msg}</p>`;

  let reply = "AI response coming soon...";

  setTimeout(()=>{
    chat.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
  },500);

  input.value = "";
}

/* GSAP animations */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".reveal").forEach(el=>{
  gsap.to(el,{
    scrollTrigger: el,
    opacity: 1,
    y: 0,
    duration: 1
  });
});