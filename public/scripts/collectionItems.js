collections.forEach(collection => {
    collection.addEventListener("click", ()=> {
        let href = window.location.href
        window.location.href = `${href}/view/${collection.id}`;
    })
})