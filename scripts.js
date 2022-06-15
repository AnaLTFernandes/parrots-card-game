
setTimeout(() => {
    
let qdtCartas = prompt("Com quantas cartas deseja jogar?");
let contador = 0;

while ((qdtCartas % 2) !== 0 || qdtCartas < 4 || qdtCartas > 14) {
    qdtCartas = prompt("Com quantas cartas deseja jogar?");
}

while (contador < qdtCartas) {
    contador ++;
    document.querySelector(".mesa").innerHTML += `
    <div class="card back">
        <img src="./img/back-face.png">
    </div>`;
}}, 2000);