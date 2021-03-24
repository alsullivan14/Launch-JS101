const rl = require("readline-sync");
const VALID_CHOICES = ['rock', 'r', 'paper', 'p', 'scissors', 'sc', 'lizard', 'l', 'spock', 'sp'];
/*
const VALID_CHOICES = {
   rock: ['rock', 'r'],
   paper: ['paper', 'p'],
   scissors: ['scissors', 'sc'],
   lizard: ['lizard', 'l'],
   spock: ['spock', 'sp']
}
*/
function prompt(message) {
  console.log(`=> ${message}.`);
}

while (true) {
  //Change prompt to allow first letter to be entered or 'sp' for spock
  prompt("Enter your choice or type the first letter of your choice below\n(if choosing scissors type 'sc')\n(if choosing spock type 'sp')\n--> rock, paper, scissors, lizard, spock");
  let choice = rl.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice");
    choice = rl.question();
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  prompt(`You chose ${choice}, the computer chose ${computerChoice}`);
  //Added lizard and spock to winning choices
  if ((choice[0] === 'r' && (computerChoice.slice(0, 2) === 'sc' || computerChoice[0] === 'l')) ||
     (choice[0] === 'p' && (computerChoice[0] === 'r' || computerChoice.slice(0, 2) === 'sp')) ||
     (choice.slice(0, 2) === 'sc' && (computerChoice[0] === 'p' || computerChoice[0] === 'l')) ||
     (choice[0] === 'l' && (computerChoice[0] === 'p' || computerChoice.slice(0, 2) === 'sp')) ||
     (choice.slice(0, 2) === 'sp' && (computerChoice[0] === 'r' || computerChoice.slice(0, 2) === 'sc'))) {
    prompt('You win!');
  } else if (choice !== computerChoice) { // If not winning choice for user and choice doesn't equal computer choice, must be a loss for user
    prompt('Computer wins!');
  } else {
    prompt("It's a tie");
  }

  prompt("Do you want to play again (y/n)?");
  let answer = rl.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt("Please enter 'y' or 'n'");
    answer = rl.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;

}