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
const audioMoeda = new Audio('../audio/moeda.mp3');
const audioErrou = new Audio('../audio/errou.mp3');

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
    caixaDasCores.style.backgroundImage = "url('../img/caixa-fechada.png')";
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

if(window.SpeechRecognition || window.webkitSpeechRecognition){
    alert('tem suporte');
}else{
    alert('não tem suporte');
}

  