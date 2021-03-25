const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const currentYear = new Date().getFullYear();
const newYears = new Date(`January 01, ${currentYear + 1}, 00:00:00`);

function updateTime() {
  const currentTime = new Date();
  const diff = newYears - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  days.innerText = d;
  const h = Math.floor(diff / 1000 / 60 / 60) % 60;
  hours.innerText = h < 10 ? "0" + h : h;
  const m = Math.floor(diff / 1000 / 60) % 60;
  minutes.innerText = m < 10 ? "0" + m : m;
  const s = Math.floor(diff / 1000) % 60;
  seconds.innerText = s < 10 ? "0" + s : s;
}

setInterval(updateTime, 1000);
