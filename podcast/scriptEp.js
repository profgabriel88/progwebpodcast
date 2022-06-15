const buscaCanais = 'https://api.audioboom.com/channels?find[title]=';
const recomendados = 'https://api.audioboom.com/channels/recommended'

var retornoBusca = [];
var retornoPodcast = [];
var retornoRecomendados = [];
var podcastUrl = '';
var slideIndex = 1;

function getPodcast() {
    var parts = window.location.href.split('var=');
    var url = 'https://api.audioboom.com/channels/'+parts[1];

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
    var parts = window.location.href.split('var=');
    let idCanal = parts[1]
    let buscaEps = `https://api.audioboom.com/channels/`+idCanal+`/audio_clips`;
    fetch(buscaEps).then(
        response => {
            response.json().then(
                data => {
                    retornoPodcast = data.body.audio_clips;
                    console.log(data);
                    montaEps();
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
    botao.innerHTML = `<button class="btn btn-outline-dark" onclick="getEps();">Episódios</button>`;

    let corpo = document.getElementById('corpo');

    corpo.appendChild(banner);
    corpo.appendChild(titulo);
    corpo.appendChild(clips);
    corpo.appendChild(descricao);
    corpo.appendChild(botao);
}

function montaEps() {
    retornoPodcast.forEach(e => {

        let titulo = document.createElement('h3');
        titulo.className = 'mt-4'
        titulo.innerHTML = e.title;
        
        let data = document.createElement('p');
        data.innerHTML = e.uploaded_at;
            
        let descricao = document.createElement('div');
        descricao.innerHTML = e.formatted_description;

        let audio = document.createElement('div');
        audio.innerHTML = `<audio
                                src ="${e.urls.high_mp3}"
                                type="audio/mpeg"
                                controls></audio>`
        
        let botao = document.createElement('div');
        botao.innerHTML = `<button class="btn btn-outline-dark"><i class="bi bi-play"></i></button>`;
        
        let hr = document.createElement('hr');
        let ep = document.getElementById('episodios');
        
        ep.appendChild(titulo);
        ep.appendChild(data);
        ep.appendChild(descricao);
        ep.appendChild(audio);
        ep.append(hr);
    })
    }