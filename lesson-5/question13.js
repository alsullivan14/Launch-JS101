// Input nested array
// Output sorted array based on sum of odd elements

// Use sort to compare sums
// Find each odd element and use reduce to find sums


let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

let answer = arr.sort((a, b) => {
  let oddsOfA = a.filter(num => {
    if (num % 2 !== 0) {
      return num;
    }
  });
  let sumOfA = oddsOfA.reduce((num, next) => num + next);
  let oddsOfB = b.filter(num => {
    if (num % 2 !== 0) {
      return num;
    }
  });
  let sumOfB = oddsOfB.reduce((num, next) => num + next);
  
  return sumOfA - sumOfB;
  });
  
  console.log(answer);
  