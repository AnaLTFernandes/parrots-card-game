let qdtCartas;
let listaCards = [1,2,3,4,5,6,7];
let baralho = [];


setTimeout(() => {
        
    qdtCartas = prompt("Com quantas cartas deseja jogar? (4-14)");

    while ((qdtCartas % 2) !== 0 || qdtCartas < 4 || qdtCartas > 14) {
        qdtCartas = prompt("Com quantas cartas deseja jogar?");
    }

    atualizarBaralho()
}, 1500);


function atualizarBaralho() {
    listaCards.sort(embaralhar);

    for (let i = 0; i < (qdtCartas/2); i++) {
        baralho.push(listaCards[i]);
    }
    for (let i = 0; i < (qdtCartas/2); i++) {
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
}


function virarCard(carta) {
    carta.classList.toggle("virar");
}


function embaralhar() {
    return Math.random() - 0.5;
}