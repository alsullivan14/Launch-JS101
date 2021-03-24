let numbers = [1, 2, 3, 4];
let list = [];


while (numbers.length > 0) {
  numbers.pop();
}


while (numbers.length > 0) {
  numbers.shift();
}


numbers.splice(0, numbers.length);


numbers.length = 0;


console.log(numbers);