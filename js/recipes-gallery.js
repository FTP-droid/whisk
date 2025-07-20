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
        const articleTextNoViewRecipeText = articleText.slice(0, -11);
        const articleTextLowerCase = articleTextNoViewRecipeText.toLowerCase();
        console.log(articleTextLowerCase);
        if(articleTextLowerCase.includes(searchLowerCase)){
            article.style.display = "grid";
        } else {
            article.style.display = "none";
        }
    }
});

