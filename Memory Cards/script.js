// clear, show, cards-containier
// prev, current, next
// add-container, hide, question
// answer, add-card

const clearBtn = document.getElementById("clear"),
  showBtn = document.getElementById("show"),
  cardsContainer = document.getElementById("cards-container"),
  prevBtn = document.getElementById("prev"),
  currentEl = document.getElementById("current"),
  nextBtn = document.getElementById("next"),
  addContainer = document.getElementById("add-container"),
  hideBtn = document.getElementById("hide"),
  questionEl = document.getElementById("question"),
  answerEl = document.getElementById("answer"),
  addCardBtn = document.getElementById("add-card");

//   Keep track of Current Card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Hard Data
// const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

const cardsData = getCardsData();

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
        <div class="inner-card">
          <div class="inner-card-front">
            <p>
              ${data.question}
            </p>
          </div>
          <div class="inner-card-back">
            <p>
              ${data.answer}
            </p>
          </div>
        </div>
    `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

function updateCurrentText() {
  currentEl.innerHTML = `${currentActiveCard + 1}/${cardsData.length}`;
}

createCards();

nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value,
    answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionEl.value = "";
    answerEl.value = "";
    addContainer.classList.remove("show");
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
