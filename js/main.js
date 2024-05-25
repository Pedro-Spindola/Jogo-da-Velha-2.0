const buttons = document.querySelectorAll('.box-gamer button');
var vezDeJogar = document.getElementById('txtQuemJoga');
var pontosP1 = document.getElementById("pontosP1");
var pontosP2 = document.getElementById("pontosP2");
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
        var nome1 = document.getElementById('nomeP1');
        var nome2 = document.getElementById('nomeP2');
        let nomeJogador1 = nome1.innerText;
        let nomeJogador2 = nome2.innerText;
        let jogada = nomeJogador1;
        console.log(nomeJogador1);
        console.log(nomeJogador2);
        // Verifica se o botão já tem um SVG dentro dele
        if (this.querySelector('img')) {
            return; // Se já tem, retorna sem fazer nada
        }
        
        // Obtém o valor do atributo data-i
        var buttonIndex = parseInt(this.getAttribute('data-i'));
        
        // Armazena o índice do botão clicado
        indexButtons.push(buttonIndex);

        if (indexButtons.length > 6) { // Verifica se o tamanho da array é maior que 6
            var removedIndex = indexButtons.shift(); // Remove o primeiro elemento da array e armazena seu valor
            
            // Seleciona o botão correspondente ao índice removido e remove o SVG dele
            var removedButton = document.querySelector('.box-gamer button[data-i="' + removedIndex + '"]');
            removedButton.innerHTML = '';

            // Reativa o botão removendo o atributo 'disabled'
            removedButton.removeAttribute('disabled');
        }
        
        if(jogada == nomeJogador1){
            if (indexJogador1.length >= 3) { // Verifica se o tamanho da array é igual ou maior que 3
                indexJogador1.shift(); // Remove o primeiro elemento da array
            }

            // Cria uma imagem SVG
            var svgImage = new Image();
            svgImage.src = 'image/xis.svg';
            svgImage.alt = 'xis';

            // Define o tamanho do SVG
            svgImage.width = 50; // Largura desejada
            svgImage.height = 50; // Altura desejada

            // Adiciona a imagem SVG ao botão
            this.appendChild(svgImage);

            // Armazena o índice do botão clicado pelo jogador 1
            indexJogador1.push(buttonIndex);

            jogada = nomeJogador2;
            txtQuemJogar = nomeJogador2; // Ajuste aqui
        } else if(jogada == nomeJogador2){
            if (indexJogador2.length >= 3) { // Verifica se o tamanho da array é igual ou maior que 3
                indexJogador2.shift(); // Remove o primeiro elemento da array
            }

            // Cria uma imagem SVG
            var svgImage = new Image();
            svgImage.src = 'image/circulo.svg';
            svgImage.alt = 'Círculo';

            // Define o tamanho do SVG
            svgImage.width = 50; // Largura desejada
            svgImage.height = 50; // Altura desejada

            // Adiciona a imagem SVG ao botão
            this.appendChild(svgImage);

            // Armazena o índice do botão clicado pelo jogador 2
            indexJogador2.push(buttonIndex);

            jogada = nomeJogador1;
            txtQuemJogar = nomeJogador1; // Ajuste aqui
        }
        vezDeJogar.innerText = "Vez do " + txtQuemJogar + " jogar.";
        
        // Desativa o botão após adicionar o SVG
        this.disabled = true;

        // Imprime os arrays no console
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
            limparBotoes(); // Limpa os botões
        } else if (verificarVencedor(indexJogador2) || verificarSequenciaVencedora(indexJogador2)) {
            console.log(nomeJogador2 + " ganhou!");
            indexJogador1.splice(0, indexJogador1.length);
            indexJogador2.splice(0, indexJogador2.length);
            indexButtons.splice(0, indexButtons.length);
            pontosJ2++;
            pontosP2.innerText = pontosJ2;
            limparBotoes(); // Limpa os botões
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
        button.innerHTML = ''; // Remove o SVG do botão
        button.disabled = false; // Reativa o botão
    });
}