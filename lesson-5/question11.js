// Input array
// Output each value of each object incremented by one

// 

let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

let result = arr.map(obj => {
  let incrementedObject = {};
  // Find a way to access key for each obj
  Object.entries(obj).map(entry => incrementedObject[entry[0]] = entry[1] + 1);
  return incrementedObject;
  });

console.log(result);