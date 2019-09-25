# validation-predicates

# Why
Functions that take some of the pain out of validating input.  Turns validation syntax into readable, easily-combinable functions.  This makes you more likely to do it.  

There are other libraries out there that do similar things:
* [Generic validators](https://www.npmjs.com/package/validation-utils)    
* [String validation](https://github.com/validatorjs/validator.js)  
 ... but they aren't as flexible as these predicates.  

 # Installation and Usage  

OPValidations.js:
``` js
const { 
  isNumberGreaterThan,
  isPopulatedArray,
  isString,  
} = require('@tmurphree/validation-predicates');

// the old way: not as readable
// const inputIsValid = function inputIsValid(x) {
//   return typeof x === 'number' &&
//     x > 5;
// };
//
// const secondIsValid = function secondIsValid(x) {
//   return Array.isArray(x) &&
//      x.length > 0 &&
//      x.every((el) => typeof el === 'string');
// };

// the same tests using validation-predicates 
const firstIsValid = function firstIsValid(x) {
  return isNumberGreaterThan(x, 5);
};

const secondIsValid = function secondIsValid(x) {
  return isPopulatedArray(x) && x.every(isString);
};

const someFunction = function someFunction(first, second) {
  if (!(firstIsValid(first))) {
    throw new Error('Invalid input to someFunction: expected a number > 5.');
  }

  if (!(secondIsValid(second))) {
    throw new Error('Expected an array of strings.');
  }

  // amazing code goes here
};

someFunction(42, ['some','array']);
```
