let collections = document.querySelectorAll(".collection_item");
collections.forEach(collection => {
    collection.addEventListener("click", ()=> {
        let href = window.location.origin
        window.location.href = `${href}/collections/view/${collection.id}`;
    })
})