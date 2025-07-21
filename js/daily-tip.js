document.addEventListener("DOMContentLoaded", () => {
  const tips = [
    "Use fresh ingredients for the best flavor.",
    "Always read the full recipe before starting.",
    "Prepare and measure all your ingredients before you start cooking.",
    "Don't overcrowd the pan; it can steam your food instead of searing it.",
    "Let your meat rest after cooking to keep it juicy.",
    "Taste as you go and adjust seasonings.",
    "Use a sharp knife for easier and safer chopping.",
  ];

  const tipElement = document.querySelector("#tips-list p");

  if (tipElement) {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      tipElement.textContent = tips[randomIndex];
    }, 10000);
  }
});
