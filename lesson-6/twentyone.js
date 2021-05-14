const readline = require('readline-sync');

const SUITS = ['H', 'D', 'S', 'C'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const WINNING_SCORE = 5;

let playerScore = 0;
let dealerScore = 0;

function prompt(message) {
  console.log(`=> ${message}`);
}

function shuffle(array) {
  for (let first = array.length - 1; first > 0; first--) {
    let second = Math.floor(Math.random() * (first + 1));
    [array[first], array[second]] = [array[second], array[first]];
  }

  return array;
}

function initalizeDeck() {
  let deck = [];

  for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex++) {
    let suit = SUITS[suitIndex];

    for (let valueIndex = 0; valueIndex < VALUES.length; valueIndex++) {
      let value = VALUES[valueIndex];
      deck.push([suit, value]);
    }
  }

  return shuffle(deck);
}

function displayCards(playerHand, dealerHand, cardFaceDown = true) {
  let playerCardValues = playerHand.map(subarray => subarray[1]);
  let dealerCardValues = dealerHand.map(subarray => subarray[1]);
  if (cardFaceDown) {
    dealerCardValues[1] = "Unknown Card";
  }
  prompt(`Dealer has: ${dealerCardValues.join(", ")}\n=> You have: ${playerCardValues.join(", ")}`);
}

function total(cards) {
  let values = cards.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === "A") {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  values.filter(value => value === "A").forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

function busted(cardTotal) {
  return cardTotal > 21;
}

function detectResult(dealerTotal, playerTotal) {
  if (playerTotal > 21) {
    dealerScore += 1;
    return 'PLAYER_BUSTED';
  } else if (dealerTotal > 21) {
    playerScore += 1;
    return 'DEALER_BUSTED';
  } else if (dealerTotal < playerTotal) {
    playerScore += 1;
    return 'PLAYER';
  } else if (dealerTotal > playerTotal) {
    dealerScore += 1;
    return 'DEALER';
  } else {
    return 'TIE';
  }
}

function displayResults(dealerTotal, playerTotal) {
  let result = detectResult(dealerTotal, playerTotal);
  switch (result) {
    case 'PLAYER_BUSTED':
      prompt('You busted! Dealer wins!');
      break;
    case 'DEALER_BUSTED':
      prompt('Dealer busted! You win!');
      break;
    case 'PLAYER':
      prompt('You win!');
      break;
    case 'DEALER':
      prompt('Dealer wins!');
      break;
    case 'TIE':
      prompt("It's a tie!");
      break;
  }
}

function displayScore(playerScore, dealerScore) {
  console.log(`Player score: ${playerScore}\nDealer score ${dealerScore}`);
}

function displayOverallWinner(playerScore, dealerScore) {
  if (playerScore > dealerScore) {
    prompt("The match winner is PLAYER!!");
  } else if (playerScore < dealerScore) {
    prompt("The match winner is the DEALER!");
  } else {
    prompt("The match has ended in a tie.");
  }
}

function winningScoreReached(playerScore, dealerScore) {
  if (playerScore === WINNING_SCORE || dealerScore === WINNING_SCORE) {
    return true;
  } else {
    return false;
  }
}

function playAgain() {
  let response;
  prompt('Play again?');
  response = readline.question().toLowerCase();
  while (!["yes", "no"].includes(response)) {
    prompt("That's not a valid option. Please enter 'yes' or 'no': ");
    response = readline.question().toLowerCase();
  }
  return response;
}

function popTwoFromDeck(deck) {
  return [deck.pop(), deck.pop()];
}


while (true) {
  prompt('Welcome to Twenty-One!');
  console.log(`**** First player to ${WINNING_SCORE} wins ****`);

  let deck = initalizeDeck();
  let playerCards = [];
  let dealerCards = [];

  playerCards.push(...popTwoFromDeck(deck));
  dealerCards.push(...popTwoFromDeck(deck));

  let playerTotal = total(playerCards);
  let dealerTotal = total(dealerCards);

  displayCards(playerCards, dealerCards);
  prompt(`Your card total is ${playerTotal}`);

  while (true) {
    let playerTurn;
    while (true) {
      prompt('Would you like to (h)it or (s)tay?');
      playerTurn = readline.question().toLowerCase();
      if (['h', 's', 'hit', 'stay'].includes(playerTurn)) break;
      prompt("Sorry, must enter 'h' or 's'.");
    }

    if (playerTurn === 'h' || playerTurn === 'hit') {
      playerCards.push(deck.pop());
      prompt('You chose to hit!');
      displayCards(playerCards, dealerCards);
      playerTotal = total(playerCards);
      prompt(`Your card total is now ${playerTotal}`);
    }

    if (['s', 'stay'].includes(playerTurn) || busted(playerTotal)) break;
  }

  if (busted(playerTotal)) {
    displayCards(playerCards, dealerCards, false);
    displayResults(dealerTotal, playerTotal);
    displayScore(playerScore, dealerScore);
    if (winningScoreReached(playerScore, dealerScore)) {
      let winner = playerScore === WINNING_SCORE ? "Player" : "Dealer";
      prompt(`${winner} has reached the Winning Score!!`);
      break;
    } else if (playAgain() === "yes") {
      continue;
    } else {
      displayOverallWinner(playerScore, dealerScore);
      break;
    }
  } else {
    prompt(`You stayed at ${playerTotal}`);
  }

  prompt('Dealer turn...');

  while (dealerTotal < 17) {
    prompt(`Dealer hits!`);
    dealerCards.push(deck.pop());
    dealerTotal = total(dealerCards);
    displayCards(playerCards, dealerCards);
  }

  if (busted(dealerTotal)) {
    displayCards(playerCards, dealerCards, false);
    prompt(`Dealer total is now: ${dealerTotal}`);
    displayResults(dealerTotal, playerTotal);
    displayScore(playerScore, dealerScore);
    if (winningScoreReached(playerScore, dealerScore)) {
      let winner = playerScore === WINNING_SCORE ? "Player" : "Dealer";
      prompt(`${winner} has reached the Winning Score!!`);
      break;
    } else if (playAgain() === "yes") {
      continue;
    } else {
      displayOverallWinner(playerScore, dealerScore);
      break;
    }
  } else {
    prompt(`Dealer stays at ${dealerTotal}`);
  }

  prompt('==============');
  displayCards(playerCards, dealerCards, false);
  prompt('==============');

  displayResults(dealerTotal, playerTotal);

  displayScore(playerScore, dealerScore);

  if (winningScoreReached(playerScore, dealerScore)) {
    let winner = playerScore === WINNING_SCORE ? "Player" : "Dealer";
    prompt(`${winner} has reached the Winning Score!!`);
    break;
  } else if (playAgain() === "no") {
    break;
  }
}