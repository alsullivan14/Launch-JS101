function isColorValid(color) {
  if (color === "blue" || color === "green") {
    true;
  } else {
    false;
  }
}

/*
In functions that return a boolean value, you often don't need separate return statements for the true and false cases. 
Instead, you can return the value of a conditional expression directly.
*/

const colorValid = color => ["blue", "green"].includes(color);