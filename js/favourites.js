document.addEventListener("DOMContentLoaded", () => {
  /**
   * ----------------------------------------------------------------
   * SHARED FAVOURITES LOGIC
   *
   * These functions provide a consistent way to interact with
   * favourites stored in localStorage across the entire site.
   * ----------------------------------------------------------------
   */
  const getFavourites = () => {
    return JSON.parse(localStorage.getItem("whiskFavourites")) || [];
  };

  const saveFavourites = (favourites) => {
    localStorage.setItem("whiskFavourites", JSON.stringify(favourites));
  };

  /**
   * ----------------------------------------------------------------
   * LOGIC FOR INDIVIDUAL RECIPE PAGES
   *
   * This block runs only if it finds a button with the ID 'favourite-btn'.
   * It turns the button into a toggle for adding/removing a recipe.
   * ----------------------------------------------------------------
   */
  const favouriteBtn = document.getElementById("favourite-btn");
  if (favouriteBtn) {
    const recipePage = document.querySelector(".recipe-page");
    const recipeId = recipePage.getAttribute("aria-labelledby");
    const recipeTitle = document.getElementById(recipeId).textContent;
    const recipeImageSrc = document.querySelector(".recipe-image img").src;
    const imagePath = `${recipeImageSrc.substring(
      recipeImageSrc.indexOf("images/")
    )}`;
    const linkPath = window.location.pathname;

    const currentRecipe = {
      id: recipeId,
      title: recipeTitle,
      link: linkPath,
      image: imagePath,
      description: document.querySelector(".recipe-image .caption").textContent,
    };

    const updateButtonState = () => {
      const isFavourited = getFavourites().some(
        (fav) => fav.id === currentRecipe.id
      );
      if (isFavourited) {
        favouriteBtn.textContent = "Remove from Favourites";
      } else {
        favouriteBtn.textContent = "Add to Favourites";
      }
    };

    favouriteBtn.addEventListener("click", () => {
      let favourites = getFavourites();
      const isFavourited = favourites.some(
        (fav) => fav.id === currentRecipe.id
      );

      if (isFavourited) {
        favourites = favourites.filter((fav) => fav.id !== currentRecipe.id);
        alert(`"${currentRecipe.title}" was removed from your favourites.`);
      } else {
        favourites.push(currentRecipe);
        alert(`"${currentRecipe.title}" was added to your favourites.`);
      }

      saveFavourites(favourites);
      updateButtonState();
    });

    updateButtonState();
  }

  /**
   * ----------------------------------------------------------------
   * LOGIC FOR THE FAVOURITES PAGE
   *
   * This block runs only if it finds a container with the ID 'favourites-list'.
   * It dynamically renders the list of favourited recipes from localStorage.
   * ----------------------------------------------------------------
   */
  const favouritesContainer = document.getElementById("favourites-list");
  if (favouritesContainer) {
    const renderFavourites = () => {
      const parent = favouritesContainer.parentElement;
      const favourites = getFavourites();

      favouritesContainer.innerHTML = "";
      const oldMessage = parent.querySelector(".empty-message");
      if (oldMessage) {
        oldMessage.remove();
      }

      if (favourites.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        emptyMessage.innerHTML =
          'You have no favourite recipes yet. <a href="recipes-gallery.html">Explore our recipes</a> to find some!';
        emptyMessage.style.textAlign = "center";
        parent.insertBefore(emptyMessage, favouritesContainer);
        return;
      }

      favourites.forEach((recipe) => {
        const card = document.createElement("article");
        card.className = "card";
        card.setAttribute("data-recipe-id", recipe.id);

        card.innerHTML = `
          <a href="${recipe.link}">
              <img src="${recipe.image}" class="card-img-top" alt="${recipe.description}">
          </a>
          <div class="card-body">
              <h5 class="card-title">${recipe.title}</h5>
              <p class="card-text">${recipe.description}</p>
              <a href="${recipe.link}" class="btn">View Recipe</a>
          </div>
        `;

        const removeBtn = document.createElement("a");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("btn", "remove-btn");
        removeBtn.style.marginLeft = "0.5rem";

        removeBtn.addEventListener("click", () => {
          if (!confirm(`Are you sure you want to remove "${recipe.title}"?`)) {
            return;
          }
          let currentFavourites = getFavourites();
          currentFavourites = currentFavourites.filter(
            (fav) => fav.id !== recipe.id
          );
          saveFavourites(currentFavourites);
          renderFavourites();
        });

        card.querySelector(".card-body").appendChild(removeBtn);
        favouritesContainer.appendChild(card);
      });
    };

    renderFavourites();
  }
});
