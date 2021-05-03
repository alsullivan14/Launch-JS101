// Input none
// Output 32 hexadecimal characters in UUID pattern 

// Create random sequence of 32 hexadecimal characters
// Split them with hyphens based on 8-4-4-4-12 pattern


function uuid() {
  let characterString = '';
  let hexvalues = "0123456789abcdef"
  let index = 0;
  while (index < 32) {
    let randomValue = Math.floor(Math.random() * 16);
    characterString += hexvalues[randomValue];
    index++;
  }
  debugger;
  let result = characterString.slice(0, 9) + "-" + characterString.slice(9, 13) + "-" 
  + characterString.slice(13, 17) + "-" + characterString.slice(17, 21) + "-" + characterString.slice(21);
  console.log(result);
}

uuid();