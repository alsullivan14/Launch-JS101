// Input loan amount, loan duration and Annual Percentage Rate
// Ouput monthly interest rate, loan duration(months)

/*
Accept loan amount as integer or float,
round to two decimal places if necessary.
Accept loan duration as number of months or years.
Convert to months if not already
Accept APR as a number between 0 and 100
*/

// Convert APR to monthly interest rate

// Using formula return monthly payment

const rl = require("readline-sync");

// Welcome
let welcome = "Welcome to the Mortgage Calculator!\nTo get started we will need the following information: Loan Amount, Loan Duration and Annual Percentage Rate.";
console.log(welcome);

// Clean input with commas and convert to number
let cleanInput = function(input) {
  return Number(input.replace(/,+/g, "")).toFixed(2);
};

// Loan Amount
console.log("Please enter a Loan Amount in dollars: ");
let loanAmount = cleanInput(rl.prompt());
while (Number.isNaN(loanAmount) || loanAmount <= 0) {
  console.log("Not a valid number. Please try again: ");
  loanAmount = cleanInput(rl.prompt());
}

// Loan Duration
console.log("Please enter a Loan Duration: ");
let loanDuration = cleanInput(rl.prompt());
while (Number.isNaN(loanDuration) || loanDuration <= 0) {
  console.log("Not a valid number. Please try again: ");
  loanDuration = cleanInput(rl.prompt());
}

// Months or Years?
console.log("Is the loan duration in months or years?\nEnter 'm' or 'y': ");
let monthsOrYears = rl.prompt().toLowerCase();
let durationInMonths;

// Require months or years to be entered
while (!(monthsOrYears === "m" || monthsOrYears === "y")) {
  console.log("Please enter 'm' or 'y': ");
  monthsOrYears = rl.prompt().toLowerCase();
}

// Convert result to months if needed
if (monthsOrYears === "y") {
  durationInMonths = loanDuration * 12;
} else {
  durationInMonths = loanDuration;
};

// APR
console.log("Please enter an annual APR greater than zero and less than one hundred: ");
let aprAmount = cleanInput(rl.prompt());
if (!(aprAmount > 0 && aprAmount < 100)) {
  console.log("Please try again: ");
  aprAmount = cleanInput(rl.prompt());
}

// Convert APR to monthly interest rate
let aprAsDecimal = aprAmount / 100;
let monthlyInterestRate = aprAsDecimal / 12;

// Calculate monthly payment
let monthlyPayment = loanAmount * (monthlyInterestRate / (1 - Math.pow(
  (1 + monthlyInterestRate), (-durationInMonths))));
console.log(`Your monthly payment is $${monthlyPayment.toFixed(2)}`);
