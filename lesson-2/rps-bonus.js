// Input user choice for item in list, ask if the user wants to play again
//Output result of user choice vs. random computer choice,
//keeping track of score up to 5 rounds (At 5 display winner of game)


/*
Greet user and prompt for input
Randomly generate computer choice
Display winner of current round, adding outcome to score
If the score is 5, show winner of game and break
If the score is less than 5 ask user if they want to play again,
Repeat previous steps
*/

const rl = require("readline-sync");

const WINNING_SCORE = 5;
const VALID_CHOICES = ['rock', 'r', 'paper', 'p', 'scissors', 's', 'lizard', 'l', 'spock', 'S'];
const WINNING_COMBOS = {
  rock : ["scissors", "lizard"],
  paper : ["rock", "spock"],
  scissors : ["paper", "lizard"],
  lizard : ["paper", "spock"],
  spock : ["rock", "scissors"]
};

let userScore = 0;
let computerScore = 0;
let roundNumber = 1;

// Show message
function prompt(message) {
  console.log(`=> ${message}`);
}

// Greet function
function greet() {
  let welcome = "Welcome to the RPS Bonus Game!!";
  prompt(welcome);
}

// Prompt for input
function getChoice() {
  let enterChoice = "Please choose one (rock, paper, scissors, lizard or spock)\nYou may enter the word or first letter of your choice (enter lowercase 's' for scissors and uppercase 'S' for spock).";
  prompt(enterChoice);
  let choice = rl.question();
  while (!validate(choice)) {
    choice = rl.question();
  }
  return convertChoice(choice);
}

// Validate choice
function validate(item) {
  if (!VALID_CHOICES.includes(item)) {
    prompt("That's not a valid choice");
    return false;
  } else {
    return true;
  }
}

// Generate computer choice
function computersChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];
  return convertChoice(computerChoice);
}

// Convert choice
function convertChoice(option) {
  if (option.length === 1) {
    let findIndex = VALID_CHOICES.indexOf(option);
    let word = VALID_CHOICES[findIndex - 1];
    return word;
  } else {
    return option;
  }
}

// Show choices
function displayChoices(user, computer) {
  prompt(`You chose ${user}, the computer chose ${computer}`);
}

// User wins
function userWins(userInput, computerInput) {
  let win = "You won!";
  if (WINNING_COMBOS[userInput].includes(computerInput)) {
    prompt(win);
    return true;
  } else {
    return false;
  }
}

// Tie
function tie(userInput, computerInput) {
  let tie = "It's a tie";
  if (userInput === computerInput) {
    prompt(tie);
    return true;
  } else {
    return false;
  }
}

// Computer wins
function computerWins(userInput, computerInput) {
  let loss = "The computer won";
  if (WINNING_COMBOS[computerInput].includes(userInput)) {
    prompt(loss);
    return true;
  } else {
    return false;
  }
}


greet();
while (true) {

  console.log(`-----> Round ${roundNumber} <-----`);

  let userChoice = getChoice();
  let computerChoice = computersChoice();

  displayChoices(userChoice, computerChoice);

  if (computerWins(userChoice, computerChoice)) {
    computerScore++;
  } else if (userWins(userChoice, computerChoice)) {
    userScore++;
  } else {
    tie(userChoice, computerChoice);
  }

  prompt(`Player score: ${userScore}`);
  prompt(`Computer score: ${computerScore}`);

  if (userScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
    console.log(userScore === 5 ? `YOU ARE THE CHAMPION OF THE RPS BONUS GAME!!` : `THE COMPUTER IS CHAMPION!`);
    break;
  }

  prompt("Do you want to play again (y/n)?");
  let answer = rl.question().toLowerCase();

  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt("Please enter 'y' or 'n'");
    answer = rl.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;

  roundNumber += 1;
}
