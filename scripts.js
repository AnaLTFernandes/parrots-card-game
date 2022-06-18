let listaCards = [1,2,3,4,5,6,7];
let pontuacao;
let timer;
let contadorClique;
let cronometro;
let qdtCartas;
let baralho;


function jogar() {
    setTimeout(function() {
        
        timer = 0;
        pontuacao = 0;
        baralho = [];
        contadorClique = 0;

        qdtCartas = prompt("Com quantas cartas deseja jogar? (4-14)");
        qdtCartas = Number(qdtCartas);

        while ((qdtCartas % 2) !== 0 || qdtCartas < 4 || qdtCartas > 14) {
            qdtCartas = prompt("Por favor, insira um número par entre 4 e 14.");
            qdtCartas = Number(qdtCartas);
        }

        atualizarBaralho();
    }, 1000);
}

jogar();


function atualizarBaralho() {
    listaCards.sort(embaralhar);

    for (let i = 0; i < (qdtCartas/2); i++) {
        baralho.push(listaCards[i]);
        baralho.push(listaCards[i]);
    }
    
    baralho.sort(embaralhar);

    colocarCartas();
}


function colocarCartas() {

    for (let i = 0; i < qdtCartas; i++) {
        
        document.querySelector(".mesa").innerHTML += `
        <div class="card" onclick="virarCard(this)">
            <div class="back-face face">
                <img src="./img/back-face.png">
            </div>
            <div class="front-face face">
                <img src="./img/front-face/front-card-${baralho[i]}.gif">
            </div>
        </div>`;
    }

    cronometro = setInterval(temporizador, 1000);
}


function virarCard(carta) {
    contadorClique++;
    carta.classList.toggle("virar");

    verificarCards();
}


function verificarCards() {
    cartasViradas = document.querySelectorAll(".virar");

    if (cartasViradas.length === 2) {

        let card1 = cartasViradas.item(0).querySelector(".front-face img").src;
        let card2 = cartasViradas.item(1).querySelector(".front-face img").src;

        if (card1 === card2) {
            cartasViradas.item(0).classList.add("parCerto");
            cartasViradas.item(1).classList.add("parCerto");

            pontuacao += 100;
        } else {
            pontuacao -= 10;
        }

        if (pontuacao < 0) {
            pontuacao = 0;
        }

        document.querySelector(".pontuacao").innerHTML = `Pontuação final: ${pontuacao}`;

        setTimeout(() => {
            cartasViradas.item(0).classList.remove("virar");
            cartasViradas.item(1).classList.remove("virar");
        }, 1000);

        finalizarJogo();
    }
}


function finalizarJogo() {
    let cartasCertas = document.querySelectorAll(".parCerto");

    if (cartasCertas.length === qdtCartas) {

        clearInterval(cronometro);

        setTimeout(() => {
            document.querySelector(".fim").classList.add("finish");
        }, 500);

        setTimeout(() => {
            alert(`Você ganhou em ${contadorClique} jogadas!\nTempo de partida: ${timer} segundos\nPontuação final: ${pontuacao} pontos`);
        }, 700);

        setTimeout(() => {
            reiniciarPartida();
        }, 1000);
    }
}


function reiniciarPartida() {
    let reiniciar = prompt("Deseja jogar novamente? (sim/não)");

    while (reiniciar !== "sim" && reiniciar !== "não") {
        reiniciar = prompt("Deseja jogar novamente? (sim/não)");
    }

    if (reiniciar === 'sim') {
        document.querySelector(".mesa").innerHTML = '';
        document.querySelector(".temporizador").innerHTML = 0;
        document.querySelector(".pontuacao").innerHTML = `Pontuação final: 0`;
        jogar();
    }

    document.querySelector(".fim").classList.remove("finish");
}


function temporizador() {
    timer++;
    document.querySelector(".temporizador").innerHTML = timer;
}


function embaralhar() {
    return Math.random() - 0.5;
}