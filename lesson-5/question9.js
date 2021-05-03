// Input array
// Output new array with sub array elements returned in ascending order

let array = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

let result = array.map(arr => {
  return arr.sort();
});

console.log(result);