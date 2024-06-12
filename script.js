const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
let isXTurn = true;
let board = ['', '', '', '', '', '', '', '', ''];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== '') {
        return;
    }

    board[index] = isXTurn ? 'X' : 'O';
    event.target.textContent = board[index];

    if (checkWin()) {
        setTimeout(() => {
            alert(`${board[index]} wins!`);
            resetGame();
        }, 100);
    } else if (board.every(cell => cell !== '')) {
        setTimeout(() => {
            alert(`It's a tie!`);
            resetGame();
        }, 100);
    } else {
        isXTurn = !isXTurn;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    isXTurn = true;
}
