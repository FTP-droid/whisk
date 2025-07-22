const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// This function will be triggered when the user scrolls
const scrollFunction = () => {
  if (scrollToTopBtn) {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }
};

// When the user scrolls, check to display the button
window.onscroll = () => scrollFunction();

// When the user clicks on the button, scroll to the top of the document smoothly
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
