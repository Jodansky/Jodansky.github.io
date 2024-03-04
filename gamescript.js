const ROWS = 6;
const COLUMNS = 7;
let currentPlayer = 1;
let gameActive = true;

document.getElementById('resetButton').addEventListener('click', resetGame);


// 2D array to represent game board
let gameState = Array(ROWS).fill().map(() => Array(COLUMNS).fill(0));

document.querySelectorAll('.row .slot').forEach((slot, index) => {
    slot.addEventListener('click', () => handleSlotClick(index % COLUMNS));
});

function handleSlotClick(column) {
    if (!gameActive) return; // fixes marathon mode

    // find lowest empty slot in column
    for (let row = ROWS - 1; row >= 0; row--) {
        if (gameState[row][column] === 0) {
            gameState[row][column] = currentPlayer;
            break;
        }
    }
    updateBoard();
    handleCheckWinner();
    switchPlayer();
}

function updateBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLUMNS; column++) {
            const slot = document.querySelector(`.row:nth-child(${row + 1}) .slot:nth-child(${column + 1})`);
            if (gameState[row][column] === 1) {
                slot.classList.add('player-one');
            }
            else if (gameState[row][column] === 2) {
                slot.classList.add('player-two');
            }
        }
    }
}

function checkWinner() {
    // hate this algorithm should change it but it works
    // check horizontal
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS - 3; col++) {
            if (gameState[row][col] > 0 &&
                gameState[row][col] === gameState[row][col + 1] &&
                gameState[row][col] === gameState[row][col + 2] &&
                gameState[row][col] === gameState[row][col + 3]) {
                    return gameState[row][col];
            }
        }
    }
    
    // check vertical
    for (let col = 0; col < COLUMNS; col++) {
        for (let row = 0; row < ROWS - 3; row++) {
            if (gameState[row][col] > 0 &&
                gameState[row][col] === gameState[row + 1][col] &&
                gameState[row][col] === gameState[row + 2][col] &&
                gameState[row][col] === gameState[row + 3][col]) {
                    return gameState[row][col];
            }
        }
    }
    
    // check diagonal (bottom left to top right)
    for (let row = 3; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS - 3; col++) {
            if (gameState[row][col] > 0 &&
                gameState[row][col] === gameState[row - 1][col + 1] &&
                gameState[row][col] === gameState[row - 2][col + 2] &&
                gameState[row][col] === gameState[row - 3][col + 3]) {
                    return gameState[row][col];
            }
        }
    }
    
    // check diagonl (top left to bottom right)
    for (let row = 0; row < ROWS - 3; row++) {
        for (let col = 0; col < COLUMNS - 3; col++) {
            if (gameState[row][col] > 0 &&
                gameState[row][col] === gameState[row + 1][col + 1] &&
                gameState[row][col] === gameState[row + 2][col + 2] &&
                gameState[row][col] === gameState[row + 3][col + 3]) {
                    return gameState[row][col];
            }
        }
    }
    return 0; // no winner found
} // there has to be a better way to check if theres a winner

function handleCheckWinner() {
    const winner = checkWinner();
    if (winner) {
        const winningMessage = `Player ${winner} wins!`;
        document.getElementById('gameMessage').textContent = winningMessage;
        gameActive = false;
        // todo: fn to handle a draw
            // nevermind no one will ever see that screen
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}
  
function resetGame() {
    gameState = Array(ROWS).fill().map(() => Array(COLUMNS).fill(0));
    currentPlayer = 1;
    gameActive = true;
    updateBoard();
    // get rid of p1/p2 classes from slots
    document.querySelectorAll('.slot').forEach(slot => {
        slot.classList.remove('player-one', 'player-two');
    });
    document.getElementById('gameMessage').textContent = ''; // clear winning msg
}
