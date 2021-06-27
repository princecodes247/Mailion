let waitlistForms = document.querySelectorAll(".waitlist");

waitlistForms.forEach((form) => {
  form.addEventListener("submit", () => {
    event.preventDefault();
    let data = { email: form.querySelector("input").value };
    fetch("/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        let submitBtn = form.querySelector("button");
        submitBtn.innerHTML = "Email Sent!";
        setTimeout(() => {
          submitBtn.innerHTML = "Submit";
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
