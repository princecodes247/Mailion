let modal = document.querySelector(".modal");
let openBtns = document.querySelectorAll(".open-modal-btn");
let closeBtn = modal.querySelector(".close-modal-btn");

openBtns.forEach(openBtn => {
    openBtn.addEventListener("click", ()=>{
        event.preventDefault();
        modal.classList.remove("close")
    })
    
    closeBtn.addEventListener("click", ()=>{
        event.preventDefault();
        modal.classList.add("close")
    })
})