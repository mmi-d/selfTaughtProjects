const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Validate Email Address
function validateEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//Check Required Input
function checkRequiredInput(inputArr) {
  inputArr.forEach((user_entry) => {
    if (user_entry.value.trim() === "")
      showError(
        user_entry,
        user_entry.id.charAt(0).toUpperCase() +
          user_entry.id.slice(1).toLowerCase() +
          " is required"
      );
    else showSuccess(user_entry);
  });
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequiredInput([username, email, password, password2]);
  if (email.value !== "") validateEmail(email);
});
