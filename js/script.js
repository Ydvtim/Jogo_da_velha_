const currentPlayer = document.querySelector(".currentPlayer"); // para aparecer os nomes dos jogadores
const reloadButton = document.getElementById("reloadButton"); // botão para trocar o nome, a pagina vai ser atualizada.
const clearScoreButton = document.getElementById("clearScoreButton"); //botão para limpar o placar
const scoreX = document.getElementById("scoreX"); //contabilizar as vitorias de x
const scoreO = document.getElementById("scoreO"); //contabilizar as vitorias de O
const scoreEmpate = document.getElementById("scoreEmpate");// e contabilizar os empates
const nomeX = document.getElementById("nomeX"); // nomes para a tabela
const nomeO = document.getElementById("nomeO");

let selected;
let jogador1 = prompt("Digite o nome do jogador X:") || "X"; // se o usuario não escrever nada aí vai ser padrão X e O 
let jogador2 = prompt("Digite o nome do jogador O:") || "O";
nomeX.innerText = jogador1;
nomeO.innerText = jogador2;
let playerX = "X"; 
let playerO = "O";
let player = playerX; // Começando com X
let vitoriasX = 0; // vitórias de X
let vitoriasO = 0; // vitórias de O
let empates = 0; // os empates
//vitórias possiveis
let positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function init() {
    selected = Array(9).fill(null); // garantir que começe vazias
    player = playerX; // começando sempre com X
    currentPlayer.innerHTML = `SUA VEZ: ${player === "X" ? jogador1 : jogador2}`;// aparecer o jogador da vez
//vai selecionar todos os botões dentro do elemento com a class .jogo e percorrer cada um deles
    document.querySelectorAll(".jogo button").forEach((item, index) => {
        item.innerHTML = "";// vai limpar os botões
        item.removeAttribute("disabled"); // para permitir que seja clicado
        item.setAttribute("data-i", index);
        item.addEventListener("click", newMove);
    });
}

function newMove(e) {
    const index = Number(e.target.getAttribute("data-i"));

    if (!selected[index]) {
        selected[index] = player;
        e.target.innerHTML = player;
        e.target.setAttribute("disabled", true);

        if (check(player)) {
            setTimeout(() => {
                let vencedor = player === "X" ? jogador1 : jogador2;
                alert(`JOGADOR(A) ${vencedor} VENCEU! 🏆✨`);

                if (player === "X") { // implementando vitorias de x e O
                    vitoriasX++;
                    scoreX.innerText = vitoriasX;
                } 
                else {
                    vitoriasO++;
                    scoreO.innerText = vitoriasO;
                }

                init();
            }, 100);
            return;
        }

        if (!selected.includes(null)) { // implementando os empates
            setTimeout(() => {
                alert("EMPATE! 🫤");
                empates++;
                scoreEmpate.innerText = empates;
                init();
            }, 100);
            return;
        }

        player = player === "X" ? "O" : "X";
        currentPlayer.innerHTML = `SUA VEZ: ${player === "X" ? jogador1 : jogador2}`; //para aparecer os jogadores da vez
    }
}
function zerarPlacar() {
    vitoriasX = 0;
    vitoriasO = 0;
    empates = 0;
    scoreX.innerText = vitoriasX;
    scoreO.innerText = vitoriasO;
    scoreEmpate.innerText = empates;
}

//verificar vitória
function check(playerToCheck) {
    return positions.some((pos) => pos.every((index) => selected[index] === playerToCheck));
}

reloadButton.addEventListener("click", () => location.reload());
clearScoreButton.addEventListener("click", zerarPlacar);
init();
