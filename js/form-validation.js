document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form[novalidate]");

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

    if (field.type === "radio") {
      const fieldset = field.closest("fieldset");
      if (fieldset) {
        fieldset
          .querySelector("legend")
          .insertAdjacentElement("afterend", error);
      }
    } else {
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
    feedbackEl.classList.remove("error-message");
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

    const fields = form.querySelectorAll("input, select, textarea");

    const validatedRadioGroups = new Set();

    fields.forEach((field) => {
      if (field.type === "radio" && field.required) {
        const groupName = field.name;
        if (validatedRadioGroups.has(groupName)) {
          return;
        }
        validatedRadioGroups.add(groupName);

        const radioGroup = form.querySelectorAll(`input[name="${groupName}"]`);
        const isChecked = Array.from(radioGroup).some((radio) => radio.checked);

        if (!isChecked) {
          isValid = false;
          showError(field, "Please select an option.");
          if (!firstInvalidField) firstInvalidField = field;
        }
      } else {
        if (!field.checkValidity()) {
          isValid = false;
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

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (validateForm(form)) {
        handleSuccess(form);

        const submitButton = form.querySelector('[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;

          setTimeout(() => {
            submitButton.disabled = false;
          }, 4000);
        }
      }
    });
  });
});
