// Input nested array
// Output same nested structure array but only with elements divisible by 3

// Use map to return a new array
// Use filter to only return array elements that are divisible by 3

let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

let newArr = arr.map(list => list.filter(num => {
  if (num % 3 === 0) {
    return num;
  }
}));

console.log(newArr);