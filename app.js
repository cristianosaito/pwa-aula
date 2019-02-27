const main = document.querySelector('#main');

const sourceSelector = document.querySelector('#sourceSelector');

var source = 'the-washington-post';

const url_src = 'https://newsapi.org/v2/sources?apiKey=830a3db86a28452bae4a68ec840aef4a';


window.addEventListener('load',async e =>{
    updateNews();
    await updateSources();
    sourceSelector.value = source;
})

document.querySelector('#sourceSelector').addEventListener("change",(e)=>{
    source = document.querySelector('#sourceSelector').value;
    updateNews();
});

async function updateSources(){
    const res = await fetch(url_src);
    const json = await res.json();
    sourceSelector.innerHTML = json.sources.map(createOption).join('\n');
}

async function updateNews(){
    let url =  'https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=830a3db86a28452bae4a68ec840aef4a';
    const res = await fetch(url);
    const json = await res.json();
    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article){
    return `
    <div class="row">
    <div class="col text-center">
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>
                <img class="foto" src="${article.urlToImage}">
                <p>${article.description}</p>
            </a>
        </div>
    </div>
    </div>
    <hr/>
    `;
}

function createOption(source) {
    return `
     <option value="${source.id}">${source.name}</option>
    `;
}