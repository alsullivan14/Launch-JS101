// Ask the user for the first number
// Ask the user for the second number
// ASk the user which operation to perform
// Perform the operation on the two numbers
// Return the result to user

const MESSAGES = require('./calculator_messages.json');
const rl = require("readline-sync");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt(MESSAGES["Welcome"]);

while (true) {
  prompt(MESSAGES["Number"][0]);
  let number1 = rl.question();

  while (invalidNumber(number1)) {
    prompt(MESSAGES["Invalid Number"]);
    number1 = rl.question();
 }

 prompt(MESSAGES["Number"][1]);
 let number2 = rl.question();

  while (invalidNumber(number2)) {
    prompt(MESSAGES["Invalid Number"]);
    number2 = rl.question();
  }

 prompt(MESSAGES["Operation"]);
 let operation = rl.question();

 while (!['1', '2', '3', '4'].includes(operation)) {
   prompt(MESSAGES["Invalid Operation"]);
   operation = rl.question();
 }

 let output;
 switch (operation) {
   case '1':
     output = Number(number1) + Number(number2);
     break;
   case '2':
     output = Number(number1) - Number(number2);
     break;
   case '3':
     output = Number(number1) * Number(number2);
     break;
   case '4':
     output = Number(number1) / Number(number2);
 }

 prompt(MESSAGES["Result"] + output);

 prompt(MESSAGES["Another"]);
 let answer = rl.question();

 if (answer[0].toLowerCase() !== "y") break;
}