import "./common";

(() => {
  const lang = navigator.language.split("-")[0];
  for (const link_ of document.querySelectorAll("nav > .lang-select a")) {
    const link = link_ as HTMLAnchorElement;
    if (link.href.slice(1) === lang) {
      link.click();
      return;
    }
  }
  location.href = "/en";
})();
