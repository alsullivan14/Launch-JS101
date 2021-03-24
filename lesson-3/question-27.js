let munstersDescription = "The Munsters are creepy and spooky.";
let result = [];

let list = munstersDescription.split("");
let converted;

let isLetter = /[a-zA-Z]/;

list.forEach(function(letter) {
  if (isLetter.test(letter)) {
    if (letter.toLowerCase() === letter) {
      converted = letter.toUpperCase();
      result.push(converted);
    } else {
      converted = letter.toLowerCase();
      result.push(converted);
    }
  } else {
    result.push(letter);
  }
});

console.log(result.join(""));