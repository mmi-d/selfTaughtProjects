const figureParts = document.querySelectorAll(".figure-part");
const wrongEl = document.getElementById("wrong-letters");
const wordEl = document.getElementById("word");
const popupContainer = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playBtn = document.getElementById("play-button");
const notificationContainer = document.getElementById("notification-container");

const words = ["language", "barrier", "taste", "manual", "isomorphism"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Show Notification
function showNotification() {
  notificationContainer.classList.add("show");

  setTimeout(() => {
    notificationContainer.classList.remove("show");
  }, 2000);
}

//Update Wrong Letters Function
function updateWrongLettersEl() {
  wrongEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p> Wrong </p>" : ""}
  ${wrongLetters.map((e) => `<span>${e}</span>`)}
  `;

  //Display Hangman
  figureParts.forEach((part, index) => {
    const error = wrongLetters.length;

    if (index < error) {
      part.style.display = "flex";
    } else {
      part.style.display = "none";
    }
  });

  //Check if game is over
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popupContainer.style.display = "flex";
  }
}

// Display Word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (a) => `
      <span class="letter"> 
        ${correctLetters.includes(a) ? a : ""} 
      </span>
    `
    )
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/[\n]/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations, You have won! 😃";
    popupContainer.style.display = "flex";
  }
}

// Take Input
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

playBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popupContainer.style.display = "none";
});

displayWord();
