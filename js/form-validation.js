document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const formNote = document.querySelector(".form-note");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop default form submission

    // Remove any old error messages
    form.querySelectorAll(".error-message").forEach(err => err.remove());

    let isValid = true;
    let firstInvalid = null;

    // Helper: show inline error
    const showError = (input, message) => {
      const error = document.createElement("span");
      error.classList.add("error-message");
      error.textContent = message;
      input.insertAdjacentElement("afterend", error);
      if (!firstInvalid) firstInvalid = input;
      isValid = false;
    };

    // Validate required text fields
    const requiredFields = ["first-name", "last-name", "email", "recipe-name", "ingredients", "instructions"];
    requiredFields.forEach(id => {
      const input = document.getElementById(id);
      if (!input.value.trim()) {
        showError(input, `This field is required`);
      }
    });

    // Validate email format
    const emailInput = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailPattern.test(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address");
    }

    // Validate recipe type (radio buttons)
    const recipeTypeChecked = document.querySelector("input[name='type']:checked");
    if (!recipeTypeChecked) {
      const fieldset = document.querySelector("fieldset[aria-labelledby='recipe-type']");
      showError(fieldset, "Please select a recipe type");
    }

    // Validate difficulty dropdown
    const difficultySelect = document.getElementById("difficulty");
    if (!difficultySelect.value) {
      showError(difficultySelect, "Please select a difficulty level");
    }

    if (!isValid) {
      // Scroll to the first invalid field
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // If valid, show success message
    const firstName = document.getElementById("first-name").value.trim();
    const recipeName = document.getElementById("recipe-name").value.trim();

    form.reset(); // clear the form
    formNote.innerHTML = `✅ Thank you for your submission, <strong>${firstName}</strong>! Your recipe "<em>${recipeName}</em>" is awaiting review.`;
    formNote.style.color = "green";
  });
});
