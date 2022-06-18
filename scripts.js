let temporizadorDiv = document.querySelector(".temporizador");
let pontuacaoDiv = document.querySelector(".pontuacao");

let baralho = [];

let contadorClique = 0;
let pontuacao = 0;
let timer = 0;
let idCartas = 0;

let idIntervalCartas;
let cronometro;
let qdtCartas;


setTimeout (escolherNumeroCartas,1000);

function escolherNumeroCartas() {
    qdtCartas = Number(prompt("Com quantas cartas deseja jogar? (4-14)"));

    while (ehImpar(qdtCartas) || ehValorInvalido(qdtCartas)) {
        qdtCartas = Number(prompt("Por favor, insira um número par entre 4 e 14."));
    }

    atualizarBaralho();
}


function atualizarBaralho() {
    let listaCards = [1,2,3,4,5,6,7];

    listaCards.sort(embaralhar);

    for (let i = 0; i < (qdtCartas/2); i++) {
        baralho.push(listaCards[i]);
        baralho.push(listaCards[i]);
    }
    
    baralho.sort(embaralhar);
    
    idIntervalCartas  = setInterval(colocarCartas, 170);
}


function colocarCartas() {

    document.querySelector(".mesa").innerHTML += `
    <div class="card" onclick="virarCard(this)">
        <div class="back-face face">
            <img src="./img/back-face.png">
        </div>
        <div class="front-face face">
            <img src="./img/front-face/front-card-${baralho[idCartas]}.gif">
        </div>
    </div>`;

    idCartas++;

    if (idCartas === qdtCartas) {
        clearInterval(idIntervalCartas);

        setTimeout(comecarJogo,500);
    }

}


function comecarJogo() {
    temporizadorDiv.classList.add("comecar");
    pontuacaoDiv.classList.add("comecar");
    
    cronometro = setInterval(atualizarTemporizador, 1000);
}


function virarCard(carta) {
    contadorClique++;
    carta.classList.toggle("virar");

    verificarCards();
}


function verificarCards() {
    let cartasViradas = document.querySelectorAll(".virar");

    if (ehPar(cartasViradas)) {

        let card1 = cartasViradas.item(0);
        let card2 = cartasViradas.item(1);

        if (ehParIgual(cartasViradas)) {
            card1.classList.add("parCerto");
            card2.classList.add("parCerto");

            acrescentarPontuacao();
        } else {
            decrementarPontuacao();
        }

        setTimeout(atualizarPontuacao, 600);

        setTimeout(validarPar, 1000);

        finalizarJogo();
    }
}


function acrescentarPontuacao() {
    pontuacao += 100;
}


function decrementarPontuacao() {
    if ((pontuacao - 10) < 0) {
        pontuacao = 0;
    } else {
        pontuacao -= 10;
    }
}


function validarPar() {

    let cartasViradas = document.querySelectorAll(".virar");
    let card1 = cartasViradas.item(0);
    let card2 = cartasViradas.item(1);

    card1.classList.remove("virar");
    card2.classList.remove("virar");
}


function finalizarJogo() {

    if (ehTodasCertas()) {

        clearInterval(cronometro);

        setTimeout(colocarTelaFim, 500);

        setTimeout(colocarAlertaFim, 700);

        setTimeout(reiniciarPartida, 1000);
    }
}


function colocarTelaFim() {
    document.querySelector(".fim").classList.add("finish");
}


function colocarAlertaFim() {
    alert(`Você ganhou em ${contadorClique} jogadas!
    \nTempo de partida: ${timer} segundos\nPontuação: ${pontuacao} pontos`);
}


function reiniciarPartida() {
    let reiniciar = '';

    while (ehRespostaInvalida(reiniciar)) {
        reiniciar = prompt("Deseja jogar novamente? (sim/não)");
    }

    if (reiniciar === 'sim') {

        limparMesa();
        resetarVariaveis();
    }

    retirarTelaFim();
}


function limparMesa() {
    document.querySelector(".mesa").innerHTML = '';
}


function retirarTelaFim() {
    document.querySelector(".fim").classList.remove("finish");
}


function resetarVariaveis() {

    timer = 0;
    baralho = [];
    idCartas = 0;
    pontuacao = 0;
    qdtCartas = 0;
    contadorClique = 0;

    resetarTemporizador();
    resetarPontuacao();

    setTimeout (escolherNumeroCartas,1000);
}


function atualizarTemporizador() {
    timer++;
    temporizadorDiv.innerHTML = timer;
}


function atualizarPontuacao() {
    pontuacaoDiv.innerHTML = `Pontuação: ${pontuacao}`;
}


function resetarTemporizador() {

    temporizadorDiv.classList.remove("comecar");
    temporizadorDiv.innerHTML = 0;
}


function resetarPontuacao() {

    pontuacaoDiv.classList.remove("comecar");
    pontuacaoDiv.innerHTML = `Pontuação: 0`;
}


function embaralhar() {
    return Math.random() - 0.5;
}


function ehImpar(qdtCartas) {
    if ((qdtCartas % 2) !== 0) {
        return true;
    } else {
        return false;
    }
}


function ehValorInvalido(qdtCartas) {
    if (qdtCartas < 4 || qdtCartas > 14) {
        return true;
    } else {
        return false;
    }
}


function ehPar(cartasViradas) {
    return cartasViradas.length === 2;
}


function ehParIgual(cartasViradas) {
    let card1 = cartasViradas.item(0).querySelector(".front-face img").src;
    let card2 = cartasViradas.item(1).querySelector(".front-face img").src;

    if (card1 === card2) {
        return true;
    } else {
        return false;
    }
}


function ehTodasCertas() {
    let cartasCertas = document.querySelectorAll(".parCerto");

    return cartasCertas.length === qdtCartas;
}


function ehRespostaInvalida(resposta) {
    return resposta !== "sim" && resposta !== "não";
}