
setTimeout(() => {
        
    let qdtCartas = prompt("Com quantas cartas deseja jogar?");

    while ((qdtCartas % 2) !== 0 || qdtCartas < 4 || qdtCartas > 14) {
        qdtCartas = prompt("Com quantas cartas deseja jogar?");
    }

    for (let i = 0; i < qdtCartas; i++) {
        document.querySelector(".mesa").innerHTML += `
        <div class="card" onclick="virarCard(this)">
            <div class="back-face face">
                <img src="./img/back-face.png">
            </div>
            <div class="front-face face">
                <img src="./img/front-face/bobrossparrot.gif">
            </div>
        </div>`;
    }
}, 1500);


function virarCard(carta) {
    carta.classList.toggle("virar");
}