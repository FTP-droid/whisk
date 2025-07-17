document.addEventListener("DOMContentLoaded", () => {
  // Get all favourite recipe cards
  const recipeCards = document.querySelectorAll(".card");

  recipeCards.forEach(card => {
    // Create a "Remove from Favourites" button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove from Favourites";
    removeBtn.classList.add("btn", "remove-btn");
    removeBtn.style.marginTop = "0.5rem";

    // Append the button at the end of the card body
    const cardBody = card.querySelector(".card-body");
    cardBody.appendChild(removeBtn);

    // Add click event listener to remove the card
    removeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      card.remove();

      // Optional: show a quick message when removed
      console.log("Removed:", card.querySelector(".card-title").textContent);
    });
  });
});
