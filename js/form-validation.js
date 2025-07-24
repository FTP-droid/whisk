document.addEventListener("DOMContentLoaded", () => {
  // Find all forms on the page that have the 'novalidate' attribute
  const forms = document.querySelectorAll("form[novalidate]");

  // --- Helper Functions ---

  /**
   * Clears all previous error messages from a form.
   * @param {HTMLFormElement} form - The form to clear errors from.
   */
  const clearErrors = (form) => {
    form.querySelectorAll(".error-message").forEach((err) => err.remove());
    form
      .querySelectorAll(".is-invalid")
      .forEach((el) => el.classList.remove("is-invalid"));
  };

  /**
   * Displays an error message for a specific form field.
   * The message is placed inside the field's parent '.form-group'.
   * @param {HTMLElement} field - The input, select, or textarea with the error.
   * @param {string} message - The error message to display.
   */
  const showError = (field, message) => {
    field.classList.add("is-invalid");
    const error = document.createElement("p");
    error.className = "error-message";
    error.textContent = message;

    // For radio buttons, place the error after the fieldset legend
    if (field.type === "radio") {
      const fieldset = field.closest("fieldset");
      if (fieldset) {
        fieldset
          .querySelector("legend")
          .insertAdjacentElement("afterend", error);
      }
    } else {
      // For other fields, place it inside the parent .form-group
      const formGroup = field.closest(".form-group");
      if (formGroup) {
        formGroup.appendChild(error);
      }
    }
  };

  /**
   * Handles the success state of a form after valid submission.
   * @param {HTMLFormElement} form - The successfully validated form.
   */
  const handleSuccess = (form) => {
    const feedbackEl = form.querySelector("#formFeedback");
    if (!feedbackEl) return;

    let successMessage = "✅ Thank you! Your submission was successful.";

    // Customize message based on form ID
    if (form.id === "recipeForm") {
      const firstName = form.querySelector("#first-name")?.value || "there";
      const recipeName =
        form.querySelector("#recipe-name")?.value || "your recipe";
      successMessage = `✅ Thank you, <strong>${firstName}</strong>! Your recipe "<em>${recipeName}</em>" has been submitted for review.`;
    } else if (form.id === "contactForm") {
      const name = form.querySelector("#name")?.value || "there";
      successMessage = `✅ Thank you, <strong>${name}</strong>! We have received your message and will get back to you shortly.`;
    }

    feedbackEl.innerHTML = successMessage;
    feedbackEl.classList.add("success-message");
    feedbackEl.classList.remove("error-message"); // Just in case
    form.reset();
  };

  /**
   * Validates an entire form and displays errors.
   * @param {HTMLFormElement} form - The form to validate.
   * @returns {boolean} - True if the form is valid, false otherwise.
   */
  const validateForm = (form) => {
    let isValid = true;
    let firstInvalidField = null;

    clearErrors(form);

    // Get all fields that can be validated.
    const fields = form.querySelectorAll("input, select, textarea");

    // A set to keep track of radio groups we've already validated to avoid duplicate errors
    const validatedRadioGroups = new Set();

    fields.forEach((field) => {
      // Special handling for required radio button groups
      if (field.type === "radio" && field.required) {
        const groupName = field.name;
        if (validatedRadioGroups.has(groupName)) {
          return; // Skip if we've already processed this group
        }
        validatedRadioGroups.add(groupName);

        const radioGroup = form.querySelectorAll(`input[name="${groupName}"]`);
        const isChecked = Array.from(radioGroup).some((radio) => radio.checked);

        if (!isChecked) {
          isValid = false;
          // Show error on the first radio button of the group
          showError(field, "Please select an option.");
          if (!firstInvalidField) firstInvalidField = field;
        }
      } else {
        // For all other fields, the browser's API does all the work!
        // It checks for required, type="email", pattern, min, max, etc.
        if (!field.checkValidity()) {
          isValid = false;
          // The validationMessage will automatically use the `title` attribute
          // for a pattern mismatch, which is exactly what we want.
          showError(field, field.validationMessage);
          if (!firstInvalidField) firstInvalidField = field;
        }
      }
    });

    if (!isValid && firstInvalidField) {
      firstInvalidField.focus();
      firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return isValid;
  };

  // --- Event Listener ---

  // Attach the validation logic to the submit event of each form
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Stop the default submission

      if (validateForm(form)) {
        handleSuccess(form);
      }
    });
  });
});
