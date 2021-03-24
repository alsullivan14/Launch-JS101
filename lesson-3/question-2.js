let str1 = "Come over here!"; // true
let str2 = "What's up, Doc?"; // false

console.log(str1[str1.length - 1] === "!");
console.log(str2[str2.length - 1] === "!");

str1.endsWith("!"); // true
str2.endsWith("!"); // false