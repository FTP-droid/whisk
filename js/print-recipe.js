document.addEventListener("DOMContentLoaded", () => {
  const printButton = document.getElementById("print-btn");
  if (printButton) {
    printButton.addEventListener("click", () => {
      if (window.confirm("Do you want to print this recipe?")) {
        window.print();
      }
    });
  }
});
