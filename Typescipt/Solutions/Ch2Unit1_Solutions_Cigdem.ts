//Exercise 1
/*Implement a function
const allNumber (n: number) : string =
that returns a string containing all numbers from 0 to n. 
Separate the numbers with a white space.
*/
console.log("---------Exercise 1----------")
/*const allNumber = (n:number) : string => {
    const helper = (i:number):string=>
    {
        if(i==0)
            return "0"
        else
            return helper(i-1) + " " + i
    }   
    return helper(n)
}*/

/*
function allNumber (n:number) : string 
{
    if(n==0)
        return "0"
    else
        return allNumber(n-1) + " " + n
}
*/

const allNumber = (n:number) : string => n==0 ? "0" : allNumber(n-1) + " " + n


console.log(allNumber(13))

//Exercise 2
/*
Implement a function

const allNumberRev (n: number) : string
that returns a string containing all numbers from n to 0. Separate the numbers with a white space.
*/

console.log("---------Exercise 2----------")

/*const allNumberRev = (n: number) : string =>
{
    const helper = (i:number) : string =>
    {
        if(i==0)
            return "0"
        else
            return i + " " + helper(i-1)
    }
    return helper(n)
}*/
/*
function allNumberRev (n:number):string
{
    if(n==0)
        return "0"
    else
        return n + " "+ allNumberRev(n-1)
}*/

const  allNumberRev = (n:number) : string => n==0 ? "0" : n+" "+allNumberRev(n-1) 

console.log(allNumberRev(11))


//Exercise 3
/*
Implement a function

const allNumberRange (lower: number) (upper: number) : string
that returns a string containing all numbers from n to 0. Separate the numbers with a white space.
*/

console.log("---------Exercise 3----------")
/*const allNumberRange = (lower: number) => (upper: number) : string =>
{
    const helper = (i:number) : string =>
    {
        if(i==upper)
            return upper.toString()
        else
            return i + " " + helper(i+1)
    }
    return helper(lower)
}*/

/*
const allNumberRange = 
  (lower: number) => 
  (upper:number): string => 
  lower < upper ? `${lower} ${allNumberRange(lower+1) (upper)}` :lower==upper? `${lower}`: '';

*/

/*
const allNumberRange = (lower: number) => (upper: number) : string =>
{
    if(lower == upper)
        return upper.toString()
    else
        return lower + " " + allNumberRange(lower+1)(upper)
}
*/

/*
const allNumberRange = (lower: number) => 
    (upper: number) : string =>
    lower ==upper ? upper.toString() : lower + " " + allNumberRange(lower+1)(upper)
*/

const allNumberRange = (lower: number) => 
    (upper: number) : string =>
    lower ==upper ? lower.toString() : allNumberRange(lower)(upper-1)+ " "+  upper 
console.log(allNumberRange(4)(53))


//Exercise 4
/*
Implement a function

const allNumberRangeRev (lower: number) (upper: number) : string
that returns a string containing all numbers between lower and upper in reverse order. Separate the numbers with a white space.
*/

console.log("---------Exercise 4----------")

/*
const allNumberRangeRev = (lower: number) => (upper: number) : string =>
    {
        const helper = (i:number) : string =>
        {
            if(i==lower)
                return lower.toString()
            else
                return i + " " + helper(i-1)
        }
        return helper(upper)
    }
    
    console.log(allNumberRangeRev(4)(13))

*/
const allNumberRangeRev = (lower: number) => 
    (upper: number) : string =>
    lower ==upper ? lower.toString() : upper + " " + allNumberRangeRev(lower)(upper-1)

console.log(allNumberRangeRev(4)(53))
//Exercise 5

/*
Implement a function

const allEvenRange (lower: number) (upper: number) : string
that returns a string containing all even numbers between lower and upper. Separate the numbers with a white space. */

console.log("---------Exercise 5----------")
/*
const allEvenRange = (lower: number) => (upper: number) : string =>
    {
        const helper = (i:number) : string =>
        {
            if(i==upper)
            {
                if(i%2==0)
                    return i.toString()
                else
                    return ""
            } 
            else
            {
                if(i%2==0)
                    return i + " " + helper(i+1)
                else
                    return helper(i+1)
            }
        }
        return helper(lower)
    }
    */

/*
    const allEvenRange = (lower: number) => (upper: number) : string =>
        {
            if(lower == upper && lower%2==0) 
                return upper.toString()
            else if(lower == upper && lower%2!=0)
                return ""
            else if (lower != upper && lower%2==0) 
                return lower + " " + allEvenRange(lower+1)(upper)
            else
                return allEvenRange(lower+1)(upper)

        } 
    */

    const allEvenRange = (lower: number) => (upper: number) : string =>
          (lower == upper && lower%2==0)? upper.toString():
          (lower == upper && lower%2!=0)? "":
          (lower != upper && lower%2==0)? lower + " " + allEvenRange(lower+1)(upper):
           allEvenRange(lower+1)(upper)

    console.log(allEvenRange(4)(17))

    console.log("---------Exercise 6----------")
    //Exercise 6
    /*
    const drawLine =(length: number) : string =>
    {
        if(length == 0 )
            return ""
        else
            return "*" + drawLine(length-1)

    }*/
    const drawLine =(length: number) : string => (length == 0 )? "":  "*" + drawLine(length-1)


    const drawLine2 =(symbol:string, length: number) : string =>
        {
            if(length == 0 )
                return ""
            else
                return symbol + drawLine2(symbol,length-1)
    
        }

    console.log(drawLine(10))


    console.log("---------Exercise 7----------")
//Exercise 7
/*
const drawSymbols =(symbol: string) => (length: number) : string =>
{
    const helper =(symbol:string, length: number) : string =>
    {
        if(length == 0 )
            return ""
        else
            return symbol + drawLine2(symbol,length-1)

    }
    
    return helper(symbol,length)
}*/

/*
const drawSymbols =(symbol: string) => (length: number) : string =>
    {
        if(length == 0 )
            return ""
        else
            return symbol + drawSymbols(symbol)(length-1)

    }
*/

const drawSymbols =(symbol: string) => (length: number) : string =>
    (length == 0 )? "": symbol + drawSymbols(symbol)(length-1)

console.log(drawSymbols("X")(10))

console.log("---------Exercise 8----------")

/*
const toBinary= (n: number) : string =>
{
    if(n == 0) 
        return ""
    else
        return toBinary(Math.floor(n/2)) +(n%2).toString()   

}
*/

const toBinary= (n: number) : string => 
    (n==0)? "" : toBinary(Math.floor(n/2)) +(n%2).toString()
   

console.log(toBinary(256))
console.log("---------Exercise 9----------")

/*
const toBase = (n: number) => (base :number) : string =>
{
    const helper = (n: number) : string =>
    {
        if(n == 0) 
            return ""
        else
            return helper(Math.floor(n/base)) +(n%base).toString()   
    }   
    return helper(n)
}
*/

/*
const toBase = (n: number) => (base :number) : string =>
    {
        const helper = (n: number, base:number) : string =>
        {
            if(n == 0) 
                return ""
            else
                return helper(Math.floor(n/base),base) +(n%base).toString()   
        }   
        return helper(n,base)
    }
*/

const toBase= (n: number) => (base:number): string => 
    (n==0)? "" : toBase(Math.floor(n/base))(base) +(n%base).toString()


//console.log(toBase(12)(2))