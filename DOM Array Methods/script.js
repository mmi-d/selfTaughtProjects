const addUserBtn = document.getElementById("add");
const doubltMoneyBtn = document.getElementById("double");
const sortUsers = document.getElementById("sort");
const filterMillionaires = document.getElementById("show-mill");
const calculateWealthBtn = document.getElementById("sum");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  // console.log(user.name.first);
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
  updateDOM();
}

function addData(obj) {
  data.push(obj);
}

function formatMoney(money) {
  return "$" + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function filterUsers() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

function calculateWealth() {
  const totalWealth = data.reduce((acc, user) => acc + user.money, 0);
  const totalWealthEl = document.createElement("div");
  totalWealthEl.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(
    totalWealth
  )}</strong></h3>`;
  main.appendChild(totalWealthEl);
}

function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

addUserBtn.addEventListener("click", getRandomUser);
doubltMoneyBtn.addEventListener("click", doubleMoney);
sortUsers.addEventListener("click", sortByRichest);
filterMillionaires.addEventListener("click", filterUsers);
calculateWealthBtn.addEventListener("click", calculateWealth);
