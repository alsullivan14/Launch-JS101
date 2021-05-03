// Input munsters object
// Output properties for each family member

let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

Object.entries(munsters).forEach(elem => console.log(`${elem[0]} is a ${elem[1].age} year-old ${elem[1].gender}`))


//(Name) is a (age)-year-old (male or female).

console.log(Object.entries(munsters));