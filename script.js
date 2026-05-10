const portfolioData = {
  name: "Shivam Choudhary",
  role: "Frontend Developer",
  skills: ["HTML", "CSS", "JS", "GitHub", "Python", "AI Tools"]
};


/* TEXT */
document.getElementById("name").textContent = portfolioData.name;
document.getElementById("role").textContent = portfolioData.role;


/* TYPING */
const text = "Building modern websites with AI features...";
let i = 0;

function type() {
  if (i < text.length) {
    document.getElementById("typing").textContent += text[i];
    i++;
    setTimeout(type, 50);
  }
}
type();


/* SKILLS + POPUP */
const skillsContainer = document.getElementById("skills");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");

portfolioData.skills.forEach(skill => {
  const div = document.createElement("div");
  div.classList.add("skill-card");
  div.textContent = skill;

  div.onclick = () => {
    popup.classList.remove("hidden");
    popupText.textContent = "Skill: " + skill;
  };

  skillsContainer.appendChild(div);
});

function closePopup() {
  popup.classList.add("hidden");
}


/* THEME */
const body = document.body;
body.classList.add("blue-theme");

document.getElementById("themeButton").onclick = () => {
  body.classList.toggle("blue-theme");
  body.classList.toggle("red-theme");
};


/* HIRE ME */
function hireMe() {
  alert("🚀 Thanks! I will contact you soon for collaboration.");
}


/* CHATBOT (SIMPLE AI LOGIC) */
function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  const userText = input.value;
  if (!userText) return;

  chatBox.innerHTML += `<p><b>You:</b> ${userText}</p>`;

  let reply = "I am still learning 🤖";

  if (userText.toLowerCase().includes("hello")) {
    reply = "Hello! कैसे हो?";
  }
  else if (userText.toLowerCase().includes("skills")) {
    reply = "I know HTML, CSS, JavaScript, Python";
  }
  else if (userText.toLowerCase().includes("hire")) {
    reply = "Yes! I am available for freelance work 💼";
  }

  chatBox.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;

  input.value = "";
}