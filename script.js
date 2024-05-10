const PLAYERS = {
    X: { symbol: 'X', color: "#4BBF83" },
    O: { symbol: 'O', color: "#FA3E3A" }
};
const WINNINGSTATES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let isGameActive = true;
let currentPlayer = PLAYERS.X.symbol;
const boardCells = document.querySelectorAll('.cell');
const gameStatus = document.querySelector('.game-status');
const restartButton = document.getElementById('restart-btn');

const currentPlayerTurnMsg = `It's ${currentPlayer}'s Turn`;
const winningMsg = `Player ${currentPlayer} WON!!!`;
const drawMsg = `It's a DRAW`;

let gameState = Array(9).fill("");
boardCells.forEach((cell, index) => {
    cell.setAttribute('data-cell-index', index);
});



const showStatus = (msg) => {
    gameStatus.innerHTML = msg;
}

function changePlayer() {
    currentPlayer = currentPlayer === PLAYERS.X.symbol ? PLAYERS.O.symbol : PLAYERS.X.symbol;
    showStatus(currentPlayerTurnMsg);
}

function handleCurrentCell(currentCell, currentCellIndex) {
    gameState[currentCellIndex] = currentPlayer;
    currentCell.innerHTML = currentPlayer;
    currentCell.style.borderColor = PLAYERS[currentPlayer].color;
    currentCell.style.color = PLAYERS[currentPlayer].color;
}

function validateResult() {
    let isWinning = false;

    for (let i = 0; i < WINNINGSTATES.length; i++) {
        const winCondition = WINNINGSTATES[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c == '') continue;

        if (a == b && b == c) {
            isWinning = true;
            break;
        }
    }

    if (isWinning) {
        showStatus(winningMsg);
        isGameActive = false;
        return;
    }

    const isDraw = !gameState.includes("");

    if (isDraw) {
        showStatus(drawMsg);
        isGameActive = false;
        return;
    }

    changePlayer();
}

function handleCellClick(event) {
    const currentCell = event.target;
    const currentCellIndex = parseInt(currentCell.getAttribute('data-cell-index'));

    if (gameState[currentCellIndex] !== '' || !isGameActive) return;

    handleCurrentCell(currentCell, currentCellIndex);
    validateResult();
}


boardCells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

showStatus(currentPlayerTurnMsg);

restartButton.addEventListener('click', () => {
    gameState = Array(9).fill("");
    isGameActive = true;
    currentPlayer = PLAYERS.X;
    showStatus(currentPlayerTurnMsg);
    boardCells.forEach(cell => cell.innerHTML = "");
});