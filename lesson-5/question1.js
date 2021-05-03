// Input array of number strings
// Output order array by descending number value(largest to smallest)


let arr = ['10', '11', '9', '7', '8'];

let result = arr.sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
console.log(result);