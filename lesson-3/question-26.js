/*
let sentence = "The Flintstones Rock!";
let spaceToFill;

for (let i = 0; i < 10; i++) {
  spaceToFill = sentence.padStart((sentence.length + i));
  console.log(spaceToFill);
}
*/

for (let padding = 1; padding <= 10; padding++) {
  console.log(" ".repeat(padding) + "The Flinstones Rock!");
}