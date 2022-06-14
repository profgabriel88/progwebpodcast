const buscaCanais = 'https://api.audioboom.com/channels?find[title]=';
var retornoBusca = [];
var retornoPodcast = [];
var podcastUrl = '';

function buscarCanais() {
    var busca = document.getElementById('busca').value;

    fetch(buscaCanais+busca).then(
        response => {
            response.json().then(
                data => {
                    retornoBusca = data.body.channels;
                    console.log(data.body.channels);
                    montaTabela();
                }
            )
        }
    );
}

function montaTabela() {
    let tabela = document.getElementById('tabela');
    tabela.innerHTML = '';
    retornoBusca.forEach(r => {
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