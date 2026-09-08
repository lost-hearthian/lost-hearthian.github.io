import "./index.css";
import "@splidejs/splide/css";
import Splide from "@splidejs/splide";

{
  const splide_elem = document.querySelector(
    "header > .series-carousel > .splide",
  ) as HTMLElement;
  const splide = new Splide(splide_elem, {
    type: "loop",
    arrows: false,
    padding: getComputedStyle(splide_elem).getPropertyValue("--padding"),
  });
  splide.mount();
  for (const slide of splide_elem.querySelectorAll(".splide__slide")) {
    slide.addEventListener("click", () => {
      if (slide.classList.contains("is-next")) {
        splide.go(">");
      } else if (slide.classList.contains("is-prev")) {
        splide.go("<");
      }
    });
  }
}
