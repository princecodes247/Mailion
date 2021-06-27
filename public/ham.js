let isMenuOpen = false;
const ham = document.querySelector(".ham");
const header = document.querySelector("header");

//Event listeners
ham.addEventListener("click", function () {
  if (isMenuOpen) {
    ham.classList.add("ham-norm");

    ham.classList.remove("click");
    isMenuOpen = !isMenuOpen;
    // menu.style.opacity = 0;
    // menu.style.pointerEvents = "none";
    header.classList.toggle("cheader");
  } else if (!isMenuOpen) {
    ham.classList.add("click");

    ham.classList.remove("ham-norm");
    isMenuOpen = !isMenuOpen;
    header.classList.toggle("cheader");
    // menu.style.opacity = 1;
    // menu.style.pointerEvents = "auto";
  }
});
