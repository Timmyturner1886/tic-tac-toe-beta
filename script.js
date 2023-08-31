const cells = document.querySelectorAll('[data-cell]');
const restartBtn = document.getElementById('restartBtn');
const symbolXBtn = document.getElementById('symbolX');
const symbolOBtn = document.getElementById('symbolO');

let currentPlayer = 'X';
let gameActive = false;
let playerSymbol = ''; // Player's chosen symbol
let aiSymbol = ''; // AI's symbol (opposite of player's symbol)

// Define the origBoard variable and initialize it
let origBoard = Array.from(Array(9).keys());

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Rest of your code...

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

restartBtn.addEventListener('click', restartGame);
symbolXBtn.addEventListener('click', () => chooseSymbol('X'));
symbolOBtn.addEventListener('click', () => chooseSymbol('O'));

function chooseSymbol(symbol) {
  currentPlayer = symbol;
  gameActive = true;

  // Hide symbol selection and show the board
  document.querySelector('.symbol-selection').style.display = 'none';
  document.getElementById('board').style.display = 'grid';

  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });

  playerSymbol = currentPlayer;
  aiSymbol = (playerSymbol === 'X') ? 'O' : 'X';
  if (playerSymbol === 'O') {
    aiMove(); // AI starts if player chose 'O'
  }
}

function handleClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (!gameActive || cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  origBoard[cellIndex] = currentPlayer; // Update origBoard for player's move
  checkWinner();

  if (gameActive && currentPlayer === playerSymbol) {
    currentPlayer = aiSymbol; // Switch to AI's turn
    aiMove();
  } else if (gameActive && currentPlayer === aiSymbol) {
    currentPlayer = playerSymbol; // Switch back to player's turn
  }
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
        cells[a].textContent === currentPlayer &&
        cells[b].textContent === currentPlayer &&
        cells[c].textContent === currentPlayer
      ) {
        gameActive = false;
        cells[a].classList.add('winner');
        cells[b].classList.add('winner');
        cells[c].classList.add('winner');
        
        const winnerMessage = document.querySelector('.winner-message');
        winnerMessage.textContent = (currentPlayer === playerSymbol) ? 'You won!' : 'CPU won!';
        winnerMessage.style.display = 'block';
      
        break;
      }
  }
}

// ... Your previous code ...

// ... Your previous code ...

function minimax(newBoard, player) {
    var availSpots = emptySquares();
  
    if (checkWinner()) { // Use checkWinner() instead of checkWin()
      return { score: -10 };
    } else if (checkWinner()) { // Use checkWinner() instead of checkWin()
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }
    
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
      var move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;
  
      if (player === aiSymbol) {
        var result = minimax(newBoard, playerSymbol);
        move.score = result.score;
      } else {
        var result = minimax(newBoard, aiSymbol);
        move.score = result.score;
      }
  
      newBoard[availSpots[i]] = move.index;
  
      moves.push(move);
    }
  
    var bestMove;
    if (player === aiSymbol) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  
    return moves[bestMove];
  }
  
  function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
  }
  
  function aiMove() {
    let bestMove = -1;
    let bestScore = -Infinity;
  
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent === '') {
        cells[i].textContent = aiSymbol;
        origBoard[i] = aiSymbol; // Update origBoard for AI move
        const score = minimax(origBoard, playerSymbol).score; // Update minimax call
        cells[i].textContent = '';
        origBoard[i] = i; // Reset origBoard after evaluating move
  
        console.log(`Move ${i}: Score ${score}`); // Log the score for each move
  
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
  
    if (bestMove !== -1) {
      cells[bestMove].textContent = aiSymbol;
      origBoard[bestMove] = aiSymbol; // Update origBoard for AI move
      checkWinner();
      currentPlayer = playerSymbol; // Switch back to player's turn
    }
  }
  
  // ... Rest of your code ...
  
  
  // ... Rest of your code ...
  
  
  function restartGame() {
    const winnerMessage = document.querySelector('.winner-message');
    winnerMessage.style.display = 'none';
    winnerMessage.textContent = '';
  
    location.reload();
  }
  
