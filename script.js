const buscaCanais = 'https://api.audioboom.com/channels?find[title]=';
const recomendados = 'https://api.audioboom.com/channels/recommended'

var retornoBusca = [];
var retornoPodcast = [];
var retornoRecomendados = [];
var podcastUrl = '';
var slideIndex = 1;

podcastsRecomendados();
function podcastsRecomendados() {
    fetch(recomendados).then(
        response => {
            response.json().then(
                data => {
                    retornoRecomendados = data.body;
                    montaRecomendados();
                }
            )
        }
    )
}

function montaRecomendados() {
    let recomendado = document.getElementById('recomendado');
    recomendado.innerHTML = '';
    retornoRecomendados.forEach((r, index) => {
        let div = document.createElement('div');
        div.className = 'retornoslides'

        let html = `<img class="retornoImg" src="${r.urls.logo_image.original}"></img>
                    <a 
                        href="podcast.html?var=${r.urls.web_url}" 
                        target="_blank"
                        ><button>${r.title}</button></a>`;

        div.innerHTML = html;
        recomendado.appendChild(div);
    })

    let prev = document.createElement('div');
    let next = document.createElement('div');
    prev.innerHTML = '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>'
    next.innerHTML = '<a class="next" onclick="plusSlides(1)">&#10095;</a>'

    recomendado.appendChild(prev);
    recomendado.appendChild(next);

    
    showSlides(slideIndex);
}

function buscarCanais() {
    var busca = document.getElementById('busca').value;

    fetch(buscaCanais+busca).then(
        response => {
            response.json().then(
                data => {
                    retornoBusca = data.body.channels;
                    console.log(data.body);
                    montaTabela();
                }
            )
        }
    );
}

function montaTabela() {
    let tabela = document.getElementById('tabela');
    tabela.innerHTML = '';
    retornoBusca.forEach((r, index) => {
        let div = document.createElement('div');
        div.className = 'retorno'

        let html = `<img class="retornoImg" src="${r.urls.logo_image.original}"></img>
                    <a 
                        href="podcast.html?var=${r.urls.web_url}" 
                        target="_blank"
                        ><button>${r.title}</button></a>`;

        div.innerHTML = html;
        tabela.appendChild(div);
    })
}

function getPodcast() {
    var parts = window.location.href.split('var=');
    var url = parts[1];

    fetch(url).then(
        response => {
            response.json().then(
                data => {
                    retornoPodcast = data.body.channel;
                    console.log(data);
                    montaPagina();
                }
            )
        }
    );
}

function getEps() {
    let idCanal = parseInt(retornoPodcast.channel_id);
    let buscaEps = `https://api.audioboom.com/channels/`+idCanal+`/audio_clips`;
    fetch(buscaEps).then(
        response => {
            response.json().then(
                data => {
                    retornoPodcast = data.body.channel;
                    console.log(data);
                }
            )
        }
    );
}

function montaPagina() {
    let banner = document.createElement('img');
    banner.src = retornoPodcast.urls.banner_image.original;

    let titulo = document.createElement('h2');
    titulo.className = 'mt-4'
    titulo.innerHTML = retornoPodcast.title;

    let categoria = document.createElement('p');
    categoria.innerHTML = retornoPodcast.category.title;

    let clips = document.createElement('p');
    clips.innerHTML = retornoPodcast.channel_clips_count + ' eps';

    let descricao = document.createElement('div');
    descricao.innerHTML = retornoPodcast.formatted_description;

    let botao = document.createElement('div');
    botao.innerHTML = `<button onclick="getEps();">Episódios</button>`;

    let corpo = document.getElementById('corpo');

    corpo.appendChild(banner);
    corpo.appendChild(titulo);
    corpo.appendChild(clips);
    corpo.appendChild(descricao);
    corpo.appendChild(botao);
}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("retornoslides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

    slides[slideIndex-1].style.display = "block";
}