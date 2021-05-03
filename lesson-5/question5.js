// Compute and display total of all male ages

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let total = 0;


for (let i = 0; i < Object.entries(munsters).length; i++) {
  if (Object.entries(munsters)[i][1].gender === 'male') {
    total += Object.entries(munsters)[i][1].age;
  }
}

console.log(total);