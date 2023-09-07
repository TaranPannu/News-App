const API_KEY = "642b0a4f69264d31a361524a12e232f6";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Canada"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const result = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const d = await result.json();
    bindd(d.articles);


}

function bindd(articles) {
    const container_card = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    container_card.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        filldInCard(cardClone, article);
        container_card.appendChild(cardClone);
    });
}

function filldInCard(cardClone, article) {
    const News_Source = cardClone.querySelector("#news-source");
    const News_Des = cardClone.querySelector("#news-desc");
    const News_Image = cardClone.querySelector("#news-img");
    const News_ = cardClone.querySelector("#news-title");
    News_.innerHTML = article.title;
    News_Des.innerHTML = article.description;


    News_Image.src = article.urlToImage;
   
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "America/St_Johns",
    });

    News_Source.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const Search__btn = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

Search__btn.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});