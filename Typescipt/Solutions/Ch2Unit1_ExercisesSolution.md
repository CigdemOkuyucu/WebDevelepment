## Summary

In this unit we started by describing the differences between imperative and functional programming. We showed that functional programming involves _stateless computation_ as functional program consists of a sequence of expressions that are evaluated, rather than a sequence of instructions that change a state. We hinted that this has the benefit that the result of a program never depends on the order of evaluation of its expressions or function calls.

We then proceeded to outline the model that embraces all functional programming languages, called _lambda calculus_. In this unit we presented the semantics of the untyped version of this model.

We then introduced the programming language Typescript and show how to map constructs from lambda calculus in it.

# Exercises

## Exercise 1

Implement a function

```ts
const allNumber (n: number) : string =
```

that returns a string containing all numbers from 0 to n. Separate the numbers with a white space.

### Solution 1
```ts
const allNumber = (n: number): string => n > 0 ? `${allNumber(n - 1)} ${n}` : n==0? `${n}`: '';
//OR
function allNumber1(n: number): string {
  if(n < 0) return ""
  if (n==0) return n.toString();
  return allNumber1(n-1) + " " + n.toString()
}
//But NOT this one (the Imparitive style) 
function allNumber2(n: number): string {
  let result = ""
  for (let i = 0; i <= n; i++) {
    result += i.toString() + " "
  }
  return result.trim()
}

```

## Exercise 2

Implement a function

```ts
const allNumberRev (n: number) : string
```

that returns a string containing all numbers from n to 0. Separate the numbers with a white space.

### Solution 2
```ts
const allNumberRev = (n: number): string => n < 0 ? '': n==0? `${n}`: `${n} ${allNumberRev(n - 1)}`;
//OR
function allNumberRev1(n: number): string {
  if(n < 0) return ""
  if (n==0) return n.toString();
  return n.toString() + " " + allNumberRev1(n-1)  
}
//But NOT Imparitive 
function allNumberRev2(n: number): string {
  let result = ""
  while(n>0){
    result += n.toString() + " "
    n--;
  }
  return result.trim()
}
```
## Exercise 3


Implement a function

```ts
const allNumberRange (lower: number) (upper: number) : string
```

that returns a string containing all numbers from n to 0. Separate the numbers with a white space.

### Solution 3
```ts
const allNumberRange1 = 
  (lower: number) => 
  (upper:number): string => 
  lower < upper ? `${lower} ${allNumberRange1(lower+1) (upper)}` :lower==upper? `${lower}`: '';
//OR
const allNumberRange2 = 
  (lower: number) => 
  (upper:number): string => 
  lower < upper ? `${allNumberRange2(lower) (upper-1)} ${upper}` : lower==upper? `${upper}`: '';
//OR
function allNumberRange3(lower:number){
  return function Inner(upper:number):string{
    if(lower>upper) return ''
    if(lower==upper) return lower.toString();
    return `${Inner(upper-1)} ${upper}`
  }
}
//Can this be?
const allNumberRange = 
  (lower: number, upper:number): string => 
  lower < upper ? `${lower} ${allNumberRange(lower+1, upper)}` : lower==upper? `${lower}`: '';

```
## Exercise 4

Implement a function

```ts
const allNumberRangeRev (lower: number) (upper: number) : string
```

that returns a string containing all numbers between lower and upper in reverse order. Separate the numbers with a white space.

### Solution 4
```ts
const allNumberRangeRev = 
  (lower: number) => 
  (upper:number): string => 
  lower < upper ? `${upper} ${allNumberRange1(lower) (upper-1)}` :lower==upper? `${upper}`: '';
```
## Exercise 5

Implement a function

```ts
const allEvenRange (lower: number) (upper: number) : string
```

that returns a string containing all even numbers between lower and upper. Separate the numbers with a white space.

### Solution 5
```ts
const allEvenRange = (lower:number)=> (upper:number):string =>
    (lower>upper || (lower==upper && lower%2!=0)) ? ''
    : (lower==upper && lower%2==0) ? lower.toString()
    : (lower%2==0) ? `${lower} ${allEvenRange(lower+2) (upper)}`
    : `${allEvenRange(lower+1) (upper)}`
```
## Exercise 6

Implement a function

```ts
const drawLine (length: number) : string
```

that returns a string containing length asterisks.

### Solution 6
```ts
const drawLine = (length: number) : string => length<=0? '': `*${drawLine(length-1)}`;
```
## Exercise 7

Implement a function

```ts
const drawSymbols (symbol: char) (length: number) : string
```

that returns a string containing length repetitions of symbol.

### Solution 7
```ts
const drawSymbols =  (symbol: string) => (length: number) : string =>
length<=0? '': `${symbol}${drawSymbols(symbol)(length-1)}`;
//OR
function drawSymbols2 (symbol: string){
  return function _(length: number) : string{
    return length<=0? '': `${symbol}${_(length-1)}` 
  }
}  
```
## Exercise 8

Implement a function

```ts
const toBinary (n: number) : string
```

that returns a string containing the binary representation of the input number (it must be positive).
The binary representation is obtained using the following procedure:

1. Add to the end of the string the remainder of the division between the current number and 2.
2. Repeat the previous step with `n / 2` until the number is 0. In this case simply don't add anything.

### Solution 8
```ts
const toBinary = (n:number):string => (n<0? '': Math.floor(n/2)==0? `${n%2}`: `${toBinary(Math.floor(n/2))}${n%2}`);
//OR
function toBinary2(n:number):string{
  if(n<0) return ''
  if(Math.floor(n/2)==0) return `${n%2}`
  return `${toBinary2(Math.floor(n/2))}${n%2}`
}
```
## Exercise 9

Implement a function

```ts
const toBase (n: number) (base: number) : string
```

that returns a string containing the representation of the input number in an arbitrary base (the number must be positive). The algorithm is the same as above except you must take the remainder of `n` divided by `base` and pass `n / base` to the next step.

### Solution 9
```ts
const toBase = (n:number)=>(base:number):string => n < 0 ? '' : Math.floor(n/base) == 0 ?  `${n%base}` : `${toBase(Math.floor(n/base))(base)}${n%base}`
//OR
function toBaseX(base:number){
  return function Inner(n:number):string{
    if(n < 0 ) return '' 
    else{
      if(Math.floor(n/base) == 0) return `${n%base}` 
      else return `${Inner(Math.floor(n/base))}${n%base}`
    }
  }
}

```

## Sample Exam Question week 1

Implement a python like range function with 1 change, your range should be inclusive below are the sample output for given input.
```ts
Range(5) => '0 1 2 3 4 5' 
Range(2, 5) => '2 3 4 5' 
Range(1,10,2) => '1 3 5 7 9'
Range(10, -10, -3) => '10 6 2 -2 -6 -10'
Range(-3) => ''
Range(0,-3)=> ''
```

## Extra More on functions
https://www.typescriptlang.org/docs/handbook/2/functions.html
- optional parameters
- overloads
- rest parameters
- parameter destructuring