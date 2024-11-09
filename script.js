// Select DOM elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

// Game state variables
const playerSymbol = "X"; // Player is always X
const computerSymbol = "O"; // Computer is always O
let isPlayerTurn = true; // Player starts first
let moveCount = 0; // To track draws

// Winning combinations
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize game
const initializeGame = () => {
  isPlayerTurn = true; // Player always starts first
  moveCount = 0;
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("winner");
  });
  msgContainer.classList.add("hide");

  // If player starts first, no computer move
};

// Handle box click
const handleBoxClick = (e) => {
  if (!isPlayerTurn) return; // Ignore clicks when it's not player's turn

  const box = e.target;
  makeMove(box, playerSymbol);
  moveCount++;

  if (checkWinner(playerSymbol)) {
    showWinner(playerSymbol);
    return;
  }

  if (moveCount === 9) {
    gameDraw();
    return;
  }

  isPlayerTurn = false;
  setTimeout(computerMove, 500); // Delay for better UX
};

// Make a move
const makeMove = (box, symbol) => {
  box.innerText = symbol;
  box.disabled = true;
};

// Computer's random move
const computerMove = () => {
  const availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
  if (availableBoxes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * availableBoxes.length);
  const selectedBox = availableBoxes[randomIndex];
  makeMove(selectedBox, computerSymbol);
  moveCount++;

  if (checkWinner(computerSymbol)) {
    showWinner(computerSymbol);
    return;
  }

  if (moveCount === 9) {
    gameDraw();
    return;
  }

  isPlayerTurn = true;
};

// Check for a winner
const checkWinner = (symbol) => {
  return winPatterns.some(pattern => {
    return pattern.every(index => boxes[index].innerText === symbol);
  });
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations! ${winner} wins!`;
  msgContainer.classList.remove("hide");

  // Highlight winning boxes
  winPatterns.forEach(pattern => {
    if (pattern.every(index => boxes[index].innerText === winner)) {
      pattern.forEach(index => boxes[index].classList.add("winner"));
    }
  });

  disableBoxes();
};

// Handle game draw
const gameDraw = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

// Event listeners for boxes
boxes.forEach(box => box.addEventListener("click", handleBoxClick));

// Event listeners for reset and new game buttons
resetBtn.addEventListener("click", initializeGame);
newGameBtn.addEventListener("click", initializeGame);

// Start the game for the first time
initializeGame();
