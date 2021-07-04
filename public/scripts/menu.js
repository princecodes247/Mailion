let menuBtn = document.querySelector(".c-navbar__ham")
let menu = document.querySelector(".c-navbar__links")

menuBtn.addEventListener("click", ()=> {
    menu.classList.toggle("open");
    menuBtn.classList.toggle("open");
})