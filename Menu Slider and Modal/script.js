const modal = document.getElementById("modal"),
  close = document.getElementById("close"),
  toggle = document.getElementById("toggle"),
  open = document.getElementById("open");

// Toggle Nav
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// Show Nav
open.addEventListener("click", () => modal.classList.add("show-modal"));

// Hide Nav
close.addEventListener("click", () => modal.classList.remove("show-modal"));

// Hide Nav when clicked outside
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
