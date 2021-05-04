//ENGINE DO JOGO
var engine = {
    "cores": ['green', 'purple', 'pink', 'red', 'yellow', 'orange', 'grey', 'black'],
    "hexadecimais":{
        'green': '#02EF00',
        'purple': '#790093',
        'pink': '#F02A7E',
        'red': '#E90808',
        'yellow': '#E7D703',
        'orange': '#F16529', 
        'grey': '#EBEBEB',
        'black': '#141414',
    },
    "moedas": 0
}

//DECLARA OS AUDIOS PARA A FUNÇÃO DE ACRETOU E ERROU
const audioMoeda = new Audio('/audio/moeda.mp3');
const audioErrou = new Audio('/audio/errou.mp3');

//FUNÇÃO PARA SORTEAR O NOME DAS CORES E PASSAR O SEU VALOR HEXADECIMAL 
function sortearCor(){
    var indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
    var legendaCorDaCaixa = document.getElementById('cor-na-caixa'); 
    var nomeCorSorteada = engine.cores[indexCorSorteada];

    legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();
    
    return engine.hexadecimais[nomeCorSorteada];
}

//FUNÇÃO PARA MUDAR A COR DA CAIXA
function aplicarCorNaCaixa(nomeDaCor) {
    var caixaDasCores = document.getElementById('cor-atual');

    caixaDasCores.style.backgroundColor = nomeDaCor; 
    caixaDasCores.style.backgroundImage = "url('/img/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize = "100%";

}
//FUNÇÃO PARA MUDAR O VALOR DA MOEDA E TOCAR OS SONS
function atualizaPontuacao(valor) {
    var pontuacao = document.getElementById('pontuacao-atual');
    
    engine.moedas += valor;

    if(valor < 0) {
        audioErrou.play();
    }else {
        audioMoeda.play();
    } 

    pontuacao.innerText = engine.moedas;
}

//SORTEIA AS CORES
aplicarCorNaCaixa(sortearCor());


//API DE RECONHECIMENTO DE VOZ
var btnGravador = document.getElementById("btn-responder");
var transcricaoAudio = "";
var respostaCorreta = "";



if(window.SpeechRecognition || window.webkitSpeechRecognition){
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();
    
    gravador.continuos = false;
    gravador.lang = "en-US";

//EVENTOS DO GRAVADOR
    gravador.onstart = function(){
        btnGravador.innerText = "Estou Ouvindo";
        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black";
    }
    
    gravador.onend = function(){
        btnGravador.innerText = "Responder";
        btnGravador.style.backgroundColor = "transparent";
        btnGravador.style.color = "white";    
    }

    gravador.onresult = function(event){
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();
        
        if(transcricaoAudio === respostaCorreta){
            atualizaPontuacao(1);    
        }else{
            atualizaPontuacao(-1);
        }

        aplicarCorNaCaixa(sortearCor());

        console.log(transcricaoAudio);
    }     


}else{
    alert('não tem suporte');
}

//ADICIONA O EVENTO DE OUVIR TODA VEZ QUE O BTN FOR CLICADO
btnGravador.addEventListener('click', function(){
    gravador.start();
})


