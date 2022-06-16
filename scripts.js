
setTimeout(() => {
        
    let qdtCartas = prompt("Com quantas cartas deseja jogar?");

    while ((qdtCartas % 2) !== 0 || qdtCartas < 4 || qdtCartas > 14) {
        qdtCartas = prompt("Com quantas cartas deseja jogar?");
    }

    for (let i = 0; i < qdtCartas; i++) {
        document.querySelector(".mesa").innerHTML += `
        <div class="card back" onclick="virarCard(this)">
            <img src="./img/back-face.png">
        </div>`;
    }
}, 1500);


function virarCard(carta) {
    carta.classList.toggle("virar");
    carta.classList.toggle("back");
    carta.classList.toggle("front");
}