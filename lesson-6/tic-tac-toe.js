const readline = require("readline-sync");

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_SCORE = 5;
const SQUARE_FIVE = '5';
const FIRST_MOVE = ["player", "computer", "random"];
const PLAY_AGAIN_RESPONSES = ["yes", "Yes", "YES", "no", "No", "NO"];
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayBoard(board) {
  //console.clear();
  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);
  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function chooseFirstMove() {
  let move;
  prompt(`Who moves first? ${FIRST_MOVE[0]}, ${FIRST_MOVE[1]} or ${FIRST_MOVE[2]}`);
  move = readline.question();
  while (!FIRST_MOVE.includes(move)) {
    prompt("Sorry, that's not a valid choice.");
    prompt(`Who moves first? ${FIRST_MOVE[0]}, ${FIRST_MOVE[1]} or ${FIRST_MOVE[2]}`);
    move = readline.question();
  }
  if (move === 'random') {
    move = FIRST_MOVE[Math.floor(Math.random() * 2)];
  }
  return move;
}

function initializeBoard() {
  let board = {};
  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }
  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === ' ');
}

function joinOr(arr, delimiter = ', ', word = 'or') {
  switch (arr.length) {
    case 0:
      return '';
    case 1:
      return `${arr[0]}`;
    case 2:
      return arr.join(` ${word} `);
    default:
      return arr.slice(0, arr.length - 1).join(delimiter) +
             `${delimiter}${word} ${arr[arr.length - 1]}`;
  }
}

function playerChoosesSquare(board) {
  let square;
  while (true) {
    prompt(`Choose a square (${joinOr(emptySquares(board))}):`);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;
    prompt("Sorry, that's not a valid choice.");
  }
  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {
  let square;

  let offense = findAtRiskSquare(board, COMPUTER_MARKER);
  let defense = findAtRiskSquare(board, HUMAN_MARKER);
  let squareFive = emptySquareFive(board); //FIX THIS NEXT;
  square = offense || defense || squareFive;

  let randomSquare = Math.floor(Math.random() * emptySquares(board).length);
  if (square === null) {
    square = emptySquares(board)[randomSquare];
  }
  board[square] = COMPUTER_MARKER;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function emptySquareFive(board) {
  let squareFive;
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    squareFive = line.find(square => String(square) === SQUARE_FIVE);
    if (board[squareFive] === INITIAL_MARKER) {
      return squareFive;
    }
  }
  return null;
}


function someoneWon(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];
    if (
      board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
        board[sq2] === COMPUTER_MARKER &&
        board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }
  return null;
}

function chooseSquare(board, user) {
  if (user === "player") {
    return playerChoosesSquare(board);
  } else {
    return computerChoosesSquare(board);
  }
}

function alternatePlayer(user) {
  if (user === "player") {
    return "computer";
  } else {
    return "player";
  }
}


function findAtRiskSquare(board, marker) {
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    let markersInLine = line.map(square => board[square]);
    if (markersInLine.filter(val => val === marker).length === 2) {
      let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
      if (unusedSquare !== undefined) {
        return unusedSquare;
      }
    }
  }
  return null;
}

function initializeScore() {
  let score = {
    player: 0,
    computer: 0
  };
  return score;
}

while (true) {

  let score = initializeScore();

  while (score.player !== WINNING_SCORE || score.computer !== WINNING_SCORE) {

    let board = initializeBoard();
    let currentPlayer = chooseFirstMove();


    while (true) {
      displayBoard(board);
      chooseSquare(board, currentPlayer);
      currentPlayer = alternatePlayer(currentPlayer);
      if (someoneWon(board) || boardFull(board)) break;
    }

    displayBoard(board);

    if (someoneWon(board)) {
      if (detectWinner(board) === "Player") {
        score.player += 1;
      } else {
        score.computer += 1;
      }
      prompt(`${detectWinner(board)} won!`);
    } else {
      prompt("It's a tie!");
    }

    console.log(`Current score is Player: ${score.player} | Computer: ${score.computer}`);
    if (score.player === WINNING_SCORE || score.computer === WINNING_SCORE) {
      console.log(`------> The GRAND WINNER of this match is ${score.player === WINNING_SCORE ? "Player" : "Computer"}!! <------`);
    }
    prompt('Play again?');
    let answer = readline.question().toLowerCase();
    if (!PLAY_AGAIN_RESPONSES.includes(answer)) {
      prompt("That's not a valid option. Please choose 'Yes' or 'No'");
      answer = readline.question().toLowerCase();
    } else if (answer[0] !== "y") break;
  }
  prompt('Thanks for playing Tic Tac Toe!');
  break;
}