(()=> {
  let searchBar = document.querySelector("#dashboard_search");
let collections = document.querySelectorAll(".collection_item");

searchBar.addEventListener("input", () => {
  let entry = searchBar.value.toLowerCase();
  collections.forEach((collection) => {
    let collectionTitle = collection
      .querySelector(".collection_item__title")
      .innerHTML.toLowerCase();
    let collectionDesc = collection
      .querySelector(".collection_item__desc")
      .innerHTML.toLowerCase();
    if (
      collectionTitle.indexOf(entry) > -1 ||
      collectionDesc.indexOf(entry) > -1
    ) {
      collection.classList.remove("hidden");
    } else {
      collection.classList.add("hidden");
    }
  });
});

})()