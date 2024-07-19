/*
const API_KEY = "46ce3d53a1314521b8e664558f6a4389";
const URL = "https://newsapi.org/v2/everything?q=";
*/
const API_KEY = "pub_3730221cec6a05e248d60297162cfd6ddaf1c";
const URL = "https://newsdata.io/api/1/news?apikey=pub_3730221cec6a05e248d60297162cfd6ddaf1c&q=";
//const URL = "https://newsdata.io/api/1/news?apikey=pub_3730221cec6a05e248d60297162cfd6ddaf1c&q=";


window.addEventListener("load",() => fetchNews("India"));

async function fetchNews(query){
    const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    //console.log(data);
    bindData(data.results);
}


function bindData(results){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemp = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    results.forEach((article) => {
        if(!article.image_url) return;

        const cardClone = newsCardTemp.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsdesc = cardClone.querySelector('#news-desc');
    const newsLang = cardClone.querySelector("#news-lang");

    newsImg.src = article.image_url;
    newsTitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.pubDate).toLocaleString("en-us",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML =`${article.source_id} . ${date}`;

    newsLang.innerHTML = `${article.language}`;

    cardClone.firstElementChild.addEventListener("click",() =>{
        //window.open(article.link,"_blank");
        window.open(article.link);
    })
}

let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

// Code for Searching
function performSearch() {
    const query = document.getElementById('search-text').value;
    if(!query) return;

    fetchNews(query);

    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
}

// Event listener for Enter key press
document.getElementById('search-text').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Event listener for the button click
document.getElementById('search-button').addEventListener('click', performSearch);

const placeholders = [
    "e.g. Ambani's Wedding",
    "e.g. Automobiles",
    "e.g Stock",
];
let index = 0;

function changePlaceholder() {
    const input = document.getElementById('search-text');
    input.placeholder = placeholders[index];
    index = (index + 1) % placeholders.length;
}

setInterval(changePlaceholder, 2000);
/*
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");*/

/*searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;

    fetchNews(query);

    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})
*/



/*searchText.addEventListener("DOMContentLoaded",()=>{
    const placeholders = ["e.g Ayodhya","Ambani's Wedding","Stock Market"];

    let index = 0;
    function changePlaceholder(){
        searchText.placeholder = placeholders[index];
        index = (index+1) % placeholders.length;
    }
    setInterval(changePlaceholder,2000);
})*/

