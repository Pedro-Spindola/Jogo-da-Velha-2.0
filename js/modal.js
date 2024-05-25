document.addEventListener('DOMContentLoaded', function() {
    const popup = document.querySelector('.popup');
    const finalizar = document.querySelector('.modal input[name=conf]');
    const getNomeJogador1 = document.querySelector('.modal input[name=nameJogador1]');
    const getNomeJogador2 = document.querySelector('.modal input[name=nameJogador2]');
    const inputJogador1 = document.getElementById('nomeP1');
    const inputJogador2 = document.getElementById('nomeP2');
    const vezDeJogarText = document.getElementById('txtQuemJoga');

    setTimeout(function(){
        popup.style.display = 'block';
    }, 100);

    finalizar.addEventListener('click', function(){
        popup.style.display = 'none';
        inputJogador1.innerText = getNomeJogador1.value;
        inputJogador2.innerText = getNomeJogador2.value;    
        vezDeJogarText.innerText = "Vez do " + getNomeJogador1.value + " jogar.";

        // Inicializar os nomes dos jogadores para uso no jogo
        iniciarJogo(getNomeJogador1.value, getNomeJogador2.value);
    });
});

function iniciarJogo(nomeJogador1, nomeJogador2) {
    const buttons = document.querySelectorAll('.box-gamer button');
    const vezDeJogar = document.getElementById('txtQuemJoga');
    const pontosP1 = document.getElementById("pontosP1");
    const pontosP2 = document.getElementById("pontosP2");
    let jogada = nomeJogador1;
    let txtQuemJogar = "";
    let pontosJ1 = 0;
    let pontosJ2 = 0;
    let indexJogador1 = [];
    let indexJogador2 = [];
    let indexButtons = [];
    let position = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (this.querySelector('img')) {
                return; // Se já tem, retorna sem fazer nada
            }
            
            var buttonIndex = parseInt(this.getAttribute('data-i'));
            indexButtons.push(buttonIndex);

            if (indexButtons.length > 6) {
                var removedIndex = indexButtons.shift();
                var removedButton = document.querySelector('.box-gamer button[data-i="' + removedIndex + '"]');
                removedButton.innerHTML = '';
                removedButton.removeAttribute('disabled');
            }
            
            if (jogada == nomeJogador1) {
                if (indexJogador1.length >= 3) {
                    indexJogador1.shift();
                }

                var svgImage = new Image();
                svgImage.src = 'image/xis.svg';
                svgImage.alt = 'xis';
                svgImage.width = 50;
                svgImage.height = 50;
                this.appendChild(svgImage);

                indexJogador1.push(buttonIndex);
                jogada = nomeJogador2;
                txtQuemJogar = nomeJogador2;
            } else if (jogada == nomeJogador2) {
                if (indexJogador2.length >= 3) {
                    indexJogador2.shift();
                }

                var svgImage = new Image();
                svgImage.src = 'image/circulo.svg';
                svgImage.alt = 'Círculo';
                svgImage.width = 50;
                svgImage.height = 50;
                this.appendChild(svgImage);

                indexJogador2.push(buttonIndex);
                jogada = nomeJogador1;
                txtQuemJogar = nomeJogador1;
            }
            vezDeJogar.innerText = "Vez do " + txtQuemJogar + " jogar.";
            this.disabled = true;

            console.log("Índices do Jogador 1:", indexJogador1);
            console.log("Índices do Jogador 2:", indexJogador2);
            console.log("Índices dos Botões:", indexButtons);
            if (verificarVencedor(indexJogador1) || verificarSequenciaVencedora(indexJogador1)) {
                console.log(nomeJogador1 + " ganhou!");
                indexJogador1.splice(0, indexJogador1.length);
                indexJogador2.splice(0, indexJogador2.length);
                indexButtons.splice(0, indexButtons.length);
                pontosJ1++;
                pontosP1.innerText = pontosJ1;
                limparBotoes();
            } else if (verificarVencedor(indexJogador2) || verificarSequenciaVencedora(indexJogador2)) {
                console.log(nomeJogador2 + " ganhou!");
                indexJogador1.splice(0, indexJogador1.length);
                indexJogador2.splice(0, indexJogador2.length);
                indexButtons.splice(0, indexButtons.length);
                pontosJ2++;
                pontosP2.innerText = pontosJ2;
                limparBotoes();
            }
        });
    });

    function verificarVencedor(indexJogador) {
        for (let i = 0; i < position.length; i++) {
            const linha = position[i];
            let venceu = true;
            for (let j = 0; j < linha.length; j++) {
                const index = linha[j];
                if (!indexJogador.includes(index)) {
                    venceu = false;
                    break;
                }
            }
            if (venceu) {
                return true;
            }
        }
        return false;
    }

    function verificarSequenciaVencedora(indexJogador) {
        for (let i = 0; i < position.length; i++) {
            const linha = position[i];
            let sequenciaVencedora = true;
            for (let j = 0; j < linha.length; j++) {
                const index = linha[j];
                if (!indexJogador.includes(index) || indexJogador.indexOf(index) !== j) {
                    sequenciaVencedora = false;
                    break;
                }
            }
            if (sequenciaVencedora) {
                return true;
            }
        }
        return false;
    }

    function limparBotoes() {
        buttons.forEach(function(button) {
            button.innerHTML = '';
            button.disabled = false;
        });
    }
}
