let createCollectionForm = document.querySelector("#create-collection");
let noCollectionSign = document.querySelector(".no-collection-sign");

createCollectionForm.addEventListener("submit", () => {
  event.preventDefault();
  let data = {
    title: createCollectionForm.querySelector("#collection_name_input").value,
    desc: createCollectionForm.querySelector("#collection_desc_input").value,
  };
  postRequest("/collections/create", "POST", data)
    .then((resp) => {
      let grid = document.querySelector(".dashboard__collections_grid");
      let item = document.createElement("div");
      item.classList.add("collection_item");
      let top = document.createElement("div");
      top.classList.add("collection_item__top");
      let icon = document.createElement("div");
      icon.classList.add("collection_item__icon");
      let messages = document.createElement("div");
      messages.innerHTML = "0 messages";
      messages.classList.add("collection_item__message_insight");
      top.append(icon);
      top.append(messages);
      let title = document.createElement("h4");
      title.innerHTML = resp.title;
      title.classList.add("collection_item__title");
      let desc = document.createElement("p");
      desc.innerHTML = resp.desc;
      desc.classList.add("collection_item__desc");
      item.append(top);
      item.append(title);
      item.append(desc);
      grid.append(item);
      noCollectionSign.classList.add("hidden");
      modal.classList.add("close");
    })
    .catch((err) => {
      console.log(err);
    });
});