let target = document.querySelector(".scroll-shrink");
let scrollPos = window.scrollY;
let upBtn = document.querySelector(".scroll_up_btn");

try {
  upBtn.addEventListener("click", () => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      "slow"
    );
  });
} catch (error) {
  console.log(error);
}

let hheight = target.offsetHeight;
const add_shrink_class = () => target.classList.add("small");
const remove_shrink_class = () => target.classList.remove("small");

window.addEventListener("scroll", () => {
  scrollPos = window.scrollY;
  if (scrollPos > hheight + 200) {
    upBtn.classList.remove("invisible");
    add_shrink_class();
    return;
  }
  upBtn.classList.add("invisible");
  remove_shrink_class();
});
