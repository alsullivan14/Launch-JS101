const TOTAL_LENGTH = 40;

let title = "Flintstone Family Members";

let subtractThisLength = title.length;

let padding = Math.floor((TOTAL_LENGTH - subtractThisLength) / 2);

let result = title.padStart(padding + title.length);

console.log(result);