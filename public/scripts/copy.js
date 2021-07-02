let copyBtns = document.querySelectorAll('.copyBtn')

// To implement the copy function
copyBtns.forEach(copyBtn => {
    copyBtn.addEventListener('click', () => {
        let targetName = copyBtn.dataset.target
        let target = document.querySelector(targetName)
        let dummy = document.createElement('textarea')
        dummy.innerText = target.innerHTML
        document.body.appendChild(dummy)
        dummy.select()
        dummy.setSelectionRange(0, 99999)
        document.execCommand("copy")
        document.body.removeChild(dummy)
        copyBtn.innerText = "Copied!!"
        setTimeout(() => {
            copyBtn.innerHTML = `<i class="ri-clipboard-line"></i>`
        }, 4000)
    })
})