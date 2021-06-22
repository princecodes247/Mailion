let target = document.querySelector(".scroll-shrink");
let scrollPos = window.scrollY;
let hheight = target.offsetHeight;

// let body = document.b
const add_class = () => target.classList.add("small");
const remove_class = () => target.classList.remove("small");
window.addEventListener("scroll", ()=>{
    scrollPos = window.scrollY

    if (scrollPos >= hheight) {
        add_class()
    } else {
        remove_class()
    }
})

// const add_class = () => { targets.forEach(target=>{
//     target
// }) }

// targets.forEach(target => {
//     target.addEventListener()
// })