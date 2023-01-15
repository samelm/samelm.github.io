const form = document.querySelector(".form");
const loginInput = document.getElementById("login");
const passwordInput = document.getElementById("password");
const togglePasswordShow = document.getElementById("toggle-password-show");

const homelandIllustration = document.querySelector(".homeland-illustration");
const homelandIllustrationVisibleClass = "homeland-illustration--visible";
const homelandIllustrationEyes = homelandIllustration.querySelectorAll(".eye");

let inputFocused = false;
let mouseOnForm = false;

function toggleHomelandVisible() {
  if (inputFocused || mouseOnForm) {
    homelandIllustration.classList.add(homelandIllustrationVisibleClass);
  }
  if (!inputFocused && !mouseOnForm) {
    homelandIllustration.classList.remove(homelandIllustrationVisibleClass);
  }
}

[loginInput, passwordInput].forEach((input) => {
  input.addEventListener("focus", () => {
    inputFocused = true;
    toggleHomelandVisible();
  });
  input.addEventListener("focusout", () => {
    inputFocused = false;
    toggleHomelandVisible();
  });
});

form.addEventListener("mouseenter", (e) => {
  mouseOnForm = true;
  toggleHomelandVisible();
});

form.addEventListener("mouseleave", () => {
  mouseOnForm = false;
  toggleHomelandVisible();
});

form.addEventListener("mousemove", (e) => {
  homelandIllustrationEyes.forEach((eye) => {
    const rect = eye.getBoundingClientRect();
    const x = (e.pageX - rect.left) / 25;
    const y = (e.pageY - rect.top) / 130;
    eye.style.transform = `translate(${x}px, ${y}px)`;
  });
});

togglePasswordShow.addEventListener("change", (e) => {
  const checked = e.target.checked;
  if (checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
