// Input nested array
// Output each subarray as an object of key value pairs using first and second elements in subarray

let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

// expected return value of function call
// { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }

function makeObject(arr) {
  let result = {};
  arr.forEach(subArray => {
    result[subArray[0]] = subArray[1];
  });
  console.log(result);
}

makeObject(arr);