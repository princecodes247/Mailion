let reviewForm = document.querySelector("#review-form");


reviewForm.addEventListener("submit", () => {
  event.preventDefault();
  let data = {
    name: reviewForm.querySelector("#review_name_input").value,
    message: reviewForm.querySelector("#review_message_input").value,
    title: reviewForm.querySelector("#review_title_input").value,
  };

  postRequest("/review", "POST", data)
    .then((resp) => {
      let reviewSubmit = reviewForm.querySelector("#review_submit")
      reviewSubmit.innerHTML = "Review Submitted!"
      setTimeout(() => {
        reviewSubmit.innerHTML = `<i class="ri-clipboard-line"></i>`
    }, 4000)
    })
    .catch((err) => {
      console.log(err);
    });
});
