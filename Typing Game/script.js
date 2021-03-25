const word = document.getElementById("word"),
  text = document.getElementById("text"),
  scoreEl = document.getElementById("score"),
  timeEl = document.getElementById("time"),
  endgameEl = document.getElementById("end-game-container"),
  settingsBtn = document.getElementById("settings-btn"),
  settings = document.getElementById("settings"),
  difficultyLevel = document.getElementById("difficulty"),
  settingsForm = document.getElementById("settings-form");
// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

let randomWord;
let score = 0;
let time = 10;
// Focus on text at start
text.focus();

//Difficulty Level Local Storage
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultyLevel.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Countdown
const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

function addWordtoDOM() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  word.innerHTML = randomWord;
}

// Game Over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick='location.reload()'>Reload</button>`;
  endgameEl.style.display = "flex";
}
addWordtoDOM();

text.addEventListener("input", (e) => {
  if (e.target.value === randomWord) {
    scoreEl.innerHTML = ++score;
    addWordtoDOM();
    e.target.value = "";
    // time += 5;
    if (difficulty === "easy") {
      time += 5;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 2;
    }
    updateTime();
  }
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
