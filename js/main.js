/**
 * Created by ramos on 01/03/14.
 * Edited by acaetano on 01/03/14.
 */

var ponteiro = 0;
var lista_reproducao = new Array();
var lista_reproducao_blobs = new Array();

function fct_btplay() {
    if(document.getElementById('player'))
    {
        if(document.getElementById('player').paused == true)
        {
            if (lista_reproducao[ponteiro])  //se a lista ainda não acabou
            {
                document.getElementById('nome_arquivo').innerHTML = (lista_reproducao[ponteiro].name);
                toggle_play();
                document.getElementById('player').play();
            } else  //se a lista chegou ao fim, volte ao início
            {
                // alert('Fim da lista de reprodu\u00e7\u00e3o');
                ponteiro = 0;
                document.getElementById('nome_arquivo').innerHTML = (lista_reproducao[ponteiro].name);
                document.getElementById('btplay').value = 'teste';
                //toggle_play();
                document.getElementById('player').play();
            } //else
        } else
        {
            toggle_play();
            document.getElementById('player').pause();
        } //else
    } else
    {
        alert("Primeiro selecione os arquivos a tocar!")
    }

}

function fct_btnext() {
    if(document.getElementById('player'))
    {
        if(lista_reproducao_blobs[++ponteiro]){
            document.getElementById('player').src = lista_reproducao_blobs[ponteiro];
            fct_btplay();
        } else
        {
            ponteiro = 0;
            document.getElementById('player').src = lista_reproducao_blobs[ponteiro];
            fct_btplay();
        }
    } else
    {
        alert("Primeiro selecione os arquivos a tocar!")
    }
}

function fct_btprev() {
    if(document.getElementById('player'))
    {
        if(lista_reproducao_blobs[--ponteiro]){
            document.getElementById('player').src = lista_reproducao_blobs[ponteiro];
            fct_btplay();
        } else
        {
            ponteiro = lista_reproducao_blobs.length - 1;
            document.getElementById('player').src = lista_reproducao_blobs[ponteiro];
            fct_btplay();
        }
    } else
    {
        alert("Primeiro selecione os arquivos a tocar!")
    }
}

function toggle_play() {
    var botao = document.getElementById('btplay');
    switch(botao.innerText){
        case 'Play':
            botao.innerText = 'Pause';
            break;
        default :
            botao.innerText = 'Play';
    }
}

function cria_objeto_audio(indicador){
    if (lista_reproducao_blobs[indicador]) {             // verifica se existe um endereco para o blob
        var musica = document.createElement('audio');    // cria um elemento "audio"
        musica.hidden = true;
        musica.src = lista_reproducao_blobs[indicador];  // informa o endereco do blob
        musica.id = "player";                           // identifica o elemento
        musica.controls = true;                         // define o parâmetro "controls" do elemento
        musica.autoplay = false;                         // define o parâmetro "autoplay" do elemento
        musica.addEventListener('ended', fct_btnext, false); //inicia proxima musica

        var div_audio = document.getElementById('box_controles');
        while (div_audio.hasChildNodes()) {                  // remove todos os elementos filhos
            div_audio.removeChild(div_audio.lastChild);
        } //while

        div_audio.appendChild(musica);

    } //if
} //function

function pega_arquivo(){
    document.getElementById('abrir_arquivo').click();
}

document.addEventListener("DOMContentLoaded", function(){  //substituto do jquery "$(document).ready"
    document.getElementById('btprev').onclick = fct_btprev;  // define funcao a ser chamada pelo botao
    document.getElementById('btplay').onclick = fct_btplay;  // define funcao a ser chamada pelo botao
    document.getElementById('btnext').onclick = fct_btnext;  // define funcao a ser chamada pelo botao
    document.getElementById('bt_seleciona').onclick = pega_arquivo;

    var lista_arquivos = document.getElementById('abrir_arquivo');
    lista_arquivos.addEventListener("change", function(event){
        // quando os arquivos forem selecionados (evento "change"), executa essa funcao)
        var i = 0;
        lista_reproducao = lista_arquivos.files;
        var len = lista_reproducao.length;
        var lista = '<ul>';



        for(; i<len; i++){
            lista = lista.concat('<li>',lista_reproducao[i].name,'</li>');
            var getBlobURL = window.webkitURL && webkitURL.createObjectURL.bind(webkitURL) || URL.createObjectURL;
            lista_reproducao_blobs[i] = getBlobURL(lista_reproducao[i]);
        };

        lista = lista.concat('</ul>');
        document.getElementById('box_lista_reproducao').innerHTML = lista;
        cria_objeto_audio(ponteiro);

    }); //lista_arquivos.addEventListener - "change"
}); //evento disparado ao carregar a estrutura DOM da página


/**
 * Check if the navigator supports Audio
 */
/*
 function testNavigator() {
    var context;
    if (typeof AudioContext !== "undefined") {
        context = new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        context = new webkitAudioContext();
    } else {
        alert('AudioContext not supported. :(');
        //throw new Error('AudioContext not supported. :(');
    }
}  */