const buscaCanais = 'https://api.audioboom.com/channels?find[title]=';
const recomendados = 'https://api.audioboom.com/channels/recommended'

var retornoBusca = [];
var retornoPodcast = [];
var retornoRecomendados = [];
var podcastUrl = '';
var slideIndex = 0;
var tamSlide = 1;
var slideInicial = 1;
var slideFinal = 1;
var offset = 2;

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
    // recomendado.innerHTML = '';

    let prev = document.createElement('a');
    let next = document.createElement('a');
    prev.className = 'prev';
    next.className = 'next';
    prev.setAttribute('onclick', 'plusSlides(-1)');
    next.setAttribute('onclick', 'plusSlides(1)');
    prev.innerHTML = '<i class="bi bi-chevron-left"></i>'
    next.innerHTML = '<i class="bi bi-chevron-right"></i>'

    recomendado.appendChild(prev);
    retornoRecomendados.forEach((r, index) => {
        let div = document.createElement('div');
        div.className = 'retornoslides'

        let html = `<img class="retornoImg shadow-lg mb-2" src="${r.urls.logo_image.original}"></img>
                    <a 
                        href="podcast/podcast.html?var=${r.id}" 
                        target="_blank"
                        ><button class="btn btn-warning my-2 ">${r.title}</button></a>`;

        div.innerHTML = html;
        recomendado.appendChild(div);
    })

    recomendado.appendChild(next);
    
    tamSlide = retornoRecomendados.length-1;
    slideInicial = 0;
    slideFinal = tamSlide - 3;
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
    let tituloBusca = document.getElementById('tituloBusca');
    tituloBusca.style.display = 'block';

    let tabela = document.getElementById('tabela');
    tabela.innerHTML = '';

    retornoBusca.forEach((r, index) => {
        let div = document.createElement('div');
        div.className = 'retorno'

        let html = `<img class="retornoImg shadow-lg mb-2" src="${r.urls.logo_image.original}"></img>
                    <a 
                        href="podcast/podcast.html?var=${r.id}" 
                        target="_blank"
                        ><button class="btn btn-warning my-2">${r.title}</button></a>`;

        div.innerHTML = html;
        tabela.appendChild(div);
    })
}

// Next/previous controls
function plusSlides(n) {
    offset += n;
    slideInicial += n;
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    offset -= n;
    slideInicial -= n;
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("retornoslides");

  if(slideInicial < 0) {slideInicial = 0; offset = 2;}
  if(offset > tamSlide) {offset = tamSlide; slideInicial = tamSlide-2;}

  for (i = 0; i < slides.length; i++) {
    if (i >= slideInicial && i <= offset )
        slides[i].style.display = 'block';
    else
        slides[i].style.display = 'none';
  }



    // slides[slideIndex-1].style.display = "block";
}