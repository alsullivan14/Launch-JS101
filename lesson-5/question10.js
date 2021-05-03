// Input array
// Output new array with sub array elements returned in descending order

let array = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

let result = array.map(arr => {
  if (typeof arr[0] === 'string') {
    return arr.sort().reverse();
  } else {
    return arr.slice().sort((a, b) => b - a);
  }
});

console.log(result);