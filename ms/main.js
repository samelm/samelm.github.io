const burgerBtn = document.querySelector("#menu-btn");
const menuWrapper = document.querySelector(".menu-wrapper");

burgerBtn.addEventListener("click", (e) => {
  menuWrapper.classList.toggle("show");
});

const closeMenuBtn = document.querySelector(".btn-menu-close");
closeMenuBtn.addEventListener("click", (e) => {
  menuWrapper.classList.remove("show");
});
