/*
function factors(number) {
  let divisor = number;
  let factors = [];
  do {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  } while (divisor !== 0);
  return factors;
}
*/

function factors(number) {
  let divisor = number;
  let factors = [];
  while (divisor > 0) {
    number % divisor === 0 ? factors.push(number / divisor) : factors;
    divisor -= 1;
  }
  console.log(factors);
}

factors(10);