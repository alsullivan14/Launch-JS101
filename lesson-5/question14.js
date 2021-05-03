// Input nested object
// Output array with color of fruits and size of vegetables

// hasOwnProperty()?

let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

let result = Object.keys(obj).map(ob => {
  let nestedObject = obj[ob];
  
  let attributes = Object.values(nestedObject);
  
  if (nestedObject.type === 'fruit') {
    return nestedObject.colors.map(color => color[0].toUpperCase() + color.slice(1));
  } else {
    return nestedObject.size.toUpperCase();
  }
});

console.log(result);