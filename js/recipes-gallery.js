window.onload = function() {
  document.getElementById("search-bar").value = "";
};

const searchInput = document.getElementById("search-bar");
const allRecipeCards = document.querySelector("main");

searchInput.addEventListener('keyup', e => {
    const search = e.target.value;
    const searchLowerCase = search.toLowerCase();

    for(article of allRecipeCards.children){
        const articleText = article.innerText;
        const articleTextLowerCase = articleText.toLowerCase();
        const articleTextNoViewRecipeText = articleTextLowerCase.replace("view recipe", "");
        if(articleTextNoViewRecipeText.includes(searchLowerCase)){
            article.style.display = "grid";
        } else {
            article.style.display = "none";
        }
    }
});

