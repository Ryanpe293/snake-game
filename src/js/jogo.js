const canvas = document.getElementById("tela");
const ctx = canvas.getContext("2d");

const tamanhoBloco = 20;
const totalBlocos = canvas.width / tamanhoBloco

function DesenharCenario(){
    const fundo = new Image()
    fundo.src = "https://th.bing.com/th/id/OIP.bhDmYhr10DwVF_7Eko6VKgHaHa?rs=1&pid=ImgDetMain"
    
    
    const pattern = ctx.createPattern(fundo, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
}


let cobrinha = [{
    x: 5,
    y: 5,
}]

function desenharCobra(){
    for(let parte of cobrinha){
        ctx.fillStyle = "lime";
        ctx.fillRect(parte.x * tamanhoBloco, parte.y * tamanhoBloco, tamanhoBloco, tamanhoBloco)
    }
}
desenharCobra()

let direcao = 'direita'
document.addEventListener("keydown", function (evento){
    if(evento.key === 'ArrowUp' && direcao !== 'baixo')direcao = 'cima';
    if(evento.key === 'ArrowDown' && direcao !== 'cima')direcao = 'baixo';
    if(evento.key === 'ArrowLeft' && direcao !== 'direita')direcao = 'esquerda';
    if(evento.key === 'ArrowRight' && direcao !== 'esquerda')direcao = 'direita';
});

function moverCobrinha(){
    let cabeca ={...cobrinha[0]}

    if(direcao === 'direita') cabeca.x++;
    if(direcao === 'esquerda') cabeca.x--;
    if(direcao === 'cima') cabeca.y--;
    if(direcao === 'baixo') cabeca.y++;

    cobrinha.unshift(cabeca);
    cobrinha.pop();

}

let intervaloJogo;

function IniciarJogo(){
    MusicaOn();
    cobrinha = [{x: 5, y: 5}]
    direcao = 'direita'
    pontuacao = 0;
    atualizarPontuação();

    let dificuldade = document.getElementById("dificuldade").value;
    let velocidade;

    switch(dificuldade){
        case 'facil' : velocidade = 200; break;
        case 'medio': velocidade = 120; break;
        case 'dificil': velocidade = 70; break;

    }

    clearInterval(intervaloJogo);
    intervaloJogo = setInterval(() => {
        DesenharCenario();
        moverCobrinha();
        desenharCobra();

        desenharComida();
        verificarComida();
        verificarColisoes();
    }, velocidade);
}

let comida = gerarComida();

function gerarComida(){
     return {
            x: Math.floor(Math.random() * totalBlocos),
            y: Math.floor(Math.random() * totalBlocos)
        };
}
function desenharComida(){
    ctx.fillStyle = "red";
    ctx.fillRect(comida.x * tamanhoBloco, comida.y * tamanhoBloco, tamanhoBloco, tamanhoBloco)
    
}

        var mordidaSom = new Audio();
        mordidaSom.src = 'src/sons/bite.mp3';
        mordidaSom.volume = 0.4;
        mordidaSom.load();
      
         
function verificarComida(){
    if(cobrinha[0].x === comida.x && cobrinha[0].y === comida.y){
        mordidaSom.currentTime = 0.0;
        mordidaSom.play();
       
        comida = gerarComida();
        cobrinha.push({});
        pontuacao++;
        atualizarPontuação();
    }
}

function atualizarPontuação(){
    document.getElementById('pontuacao').innerText = pontuacao;
}

function verificarColisoes(){
    let cabeca = cobrinha[0];

    if(cabeca.x < 0 || cabeca.x >= totalBlocos || cabeca.y < 0 || cabeca.y >= totalBlocos){
        gameOver();
    }
      for (let i = 1; i < cobrinha.length; i++) {
        if(cabeca.x === cobrinha[i].x && cabeca.y === cobrinha[i].y){
            gameOver();
    }
      }

    
}
var musica = new Audio();
    musica.src = 'src/sons/musica.mp3'
    musica.load();
    musica.volume = 0.8;

function MusicaOn(){
    musica.loop = true;
    musica.play();

}
function musicaOff(){
    musica.pause();
    musica.currentTime = 0.0;
}

function gameOver(){
    musicaOff();
    clearInterval(intervaloJogo);
        alert("Fim de jogo! Sua pontuação: " + pontuacao);
}


    

    
