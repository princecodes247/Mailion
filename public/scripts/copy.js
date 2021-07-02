let copyBtns = document.querySelectorAll('.copyBtn')

// To implement the copy function
copyBtns.forEach(copyBtn => {
    copyBtn.addEventListener('click', () => {
        let targetName = copyBtn.dataset.target
        let target = document.querySelector(targetName)
        target.select()
        target.setSelectionRange(0, 99999)
        document.execCommand("copy")
        copyBtn.innerText = "Copied!!"
        setTimeout(() => {
            copyBtn.innerText = `<i class="ri-clipboard-line"></i>`
        }, 4000)
    })
})