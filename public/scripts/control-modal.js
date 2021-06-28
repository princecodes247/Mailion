let modal = document.querySelector(".modal");
let openBtn = document.querySelector(".open-modal-btn");
let closeBtn = modal.querySelector(".close-modal-btn");

openBtn.addEventListener("click", ()=>{
    event.preventDefault();
    modal.classList.remove("close")
})

closeBtn.addEventListener("click", ()=>{
    event.preventDefault();
    modal.classList.add("close")
})