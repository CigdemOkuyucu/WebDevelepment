console.log("week 14")

function Reduce(fxy:(a:number, b:number)=>number, arr: number[]):number{
    let result = arr[0]
    for(let i=1; i<arr.length; i++)
        result =  fxy(result, arr[i])
    return result
}

function ReduceCurried(fxy:(a:number, b:number)=>number){
    return function(arr: number[]):number{
        let result = arr[0]
        for(let i=1; i<arr.length; i++)
            result =  fxy(result, arr[i])
        return result
    }
}

// function ReduceCurriedRecursive(fxy:(a:number, b:number)=>number){
//    return function reduce (arr:number[]):number{
//     if(arr.length ==1) return arr[0]
//     return fxy(arr[0],reduce(arr.slice(1)))
//    }
// }

function ReduceCurriedRecursive(fxy:(a:number, b:number)=>number){
    return function (arr:number[]):number{
     if(arr.length ==1) return arr[0]
     return fxy(arr[0],ReduceCurriedRecursive(fxy)(arr.slice(1)))
    }
 }

const Sum    = ReduceCurried((a,b)=> a+b);
const Product= ReduceCurried((a,b)=> a*b);
const Max    = ReduceCurried((a,b)=> a>b? a : b);

// console.log(Sum([1,2,3,4,5]))
// console.log(Product([1,2,3,4,5]))
// console.log(Max([5,4,3,2,1]))


function ReduceRecursive(fxy:(a:number, b:number)=>number, arr: number[]):number{

    if(arr.length == 1) return arr[0]
    return fxy(arr[0], ReduceRecursive(fxy, arr.slice(1)))
}



type Person = {
    Name:string,
    Age:number
}

//const person:Person = {Name:"Cigdem", Age:38}

type User = Person & {Id: number, Password:string}

type Admin = User & {kind:"Admin", Extra?:string}
type Member = User & {kind:"Member"}
type Guest = Omit<User, "Id"> & {kind:"Guest"}

const memberUser:Member = {
    Name: "Diana",
    Age : 45,
    Id:1,
    Password: "SomePassword",
    kind:"Member"
}

const adminUser:Admin = {
    Name:"Alice",
    Age: 34,
    Id: 100,
    Password : "securePassword",
    kind:"Admin",
    Extra : "Extra Info"
}

const guestUser:Guest ={
    Name:"Bob",
    Age:28,
    Password: "guestPassword",
    kind:"Guest"
}

function GreetUsers(person: Guest|Member|Admin)
{
    console.log(person.Name)
    console.log(person.Age)
    if(person.kind!="Guest")
        console.log(person.Id)
    if(person.kind =="Admin")
        console.log(person.Extra)
}

//GreetUsers(adminUser)

function toAdmin (user:User):Admin {
    return {
        //...user,
        Name : user.Name,
        Id: user.Id,
        Age: user.Age,
        Password:user.Password,
        kind:"Admin",
        Extra:"is optional"
    }
}

//const toAdmin: (u:User)=> Admin = user => ({kind:"Admin", Extra:"is Optional", ...user})


const myUser :User = {Name:"Cigdem", Id:33, Age:38, Password:"SomeSomeSome" }

//GreetUsers(toAdmin(myUser))


function stripAdmin(admin:Admin)
{
    return function(newkind?:"Member"|"Guest"): Member|Guest|User{
        const {Extra, kind, ...restofAdmin} = admin;
        if (newkind=="Member"){
            return ({kind:"Member" , ...restofAdmin});
        }
        if(newkind=="Guest"){
            const {Id, ...adminWoId} = restofAdmin
            return ({kind:"Guest", ...adminWoId})
        }
        return restofAdmin    
    } 
}

const {kind, ...guestwokind} = guestUser //Name, Age, Password
const tempUser:User = {...guestwokind,Id:10}  //Name,Age, Id, Password
//const guestUser:Guest ={Name:"Bob",Age:28,Password: "guestPassword",kind:"Guest"}
//console.log(tempUser)
let newAdmin:Admin = toAdmin(tempUser)
//console.log(newAdmin)

const strip = stripAdmin(newAdmin)
//console.log(strip())

console.log("**************************************")
console.log('Welcome to TS Generics');

function bAdd(a:number | string, b:number|string):number|string{
    if(typeof a === "number" && typeof b == "number")
        return a + b
    if(typeof a ==="string" && typeof b === "string")
        return a + b
    throw new Error ("Both arguments should have the same type")
}

function anyAdd(a: number, b: number): number;
function anyAdd(a: string, b: string): string;
function anyAdd(a: any, b: any): any { //To bypass the typecheck
    return a + b;
}

function add<T extends number | string>(a: T, b: T): T {
    if (typeof a === "number" && typeof b === "number") 
        return (a + b) as T; // Perform numeric addition
    if (typeof a === "string" && typeof b === "string") 
        return (a + b) as T; // Perform string concatenation
    
    throw new Error("Both arguments must be of the same type: either both numbers or both strings.");
    
  }


  function ReduceCurriedRecursiveGen<T>(fxy:(a:T, b:T)=>T){
    return function (arr:T[]):T{
     if(arr.length ==1) return arr[0]
     return fxy(arr[0],ReduceCurriedRecursiveGen(fxy)(arr.slice(1)))
    }
 }

const SumGen    = ReduceCurriedRecursiveGen<number>((a,b)=> a+b);
const ProductGen= ReduceCurriedRecursiveGen<number>((a,b)=> a*b);
const MaxGen    = ReduceCurriedRecursiveGen<number>((a,b)=> a>b? a : b);
const MaxLength    = ReduceCurriedRecursiveGen<string>((a,b)=> a>b? a : b);

//console.log(SumGen([1,2,3,4,5]))
//console.log(ProductGen([1,2,3,4,5]))
//console.log(MaxGen([5,4,3,2,1]))

console.log(MaxLength(["Alpha", "Bravo", "Charlie", "Let's see if"]))


// function Reduce2<T,R>(fxy:(a:R, b:T)=>R, seed:R){
//     return function (arr:T[]):R{
//      if(arr.length ==1) return seed
//      return fxy(seed,Reduce2<T,R>(fxy)(arr.slice(1))
//     }
//  }

function Reduce2<T,R>(fxy:(a:R, b:T)=>R, seed:R){
    return function(arr: T[]):R{
        let result:R = seed
        for(let i=0; i<arr.length; i++)
            result =  fxy(result, arr[i])
        return result
    }
}

const SumNumbers = Reduce2<number, number>((a,b)=>a+b, 0);
const MulNumbers = Reduce2<number, number>((a,b)=>a*b, 1);
const ConcatArrays= Reduce2<string,string> ((a,b)=>a+b, "")


console.log(SumNumbers([1,2,3,4,5]))
console.log(MulNumbers([1,2,3,4,5]))
console.log(ConcatArrays(["Hello", " ", "Welcome", "   ", ":"]))



function map<T, U>(array: T[], transform: (val: T) => U): U[] {
    const result: U[] = [];
    for (let i = 0; i < array.length; i++) {
      result.push(transform(array[i]));
    }
    return result;
  }


// console.log(
//     map<number,string>(
//         [1,2,3,4,5,6,7],
//         (num:number):string => "Number:" +num)
// )


function filter<T>(array: T[], predicate: (val: T) => boolean): T[] {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
        if(predicate(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
  }


  console.log(
    filter<number>(
        [1,2,3,4,5,6,7],
        (a:number):boolean => a%2==0 ? true: false)
)
// function Reduce2<T,R>(fxy:(a:R, b:T)=>R, seed:R){
//     return function(arr: T[]):R{
//         let result:R = seed
//         for(let i=0; i<arr.length; i++)
//             result =  fxy(result, arr[i])
//         return result
//     }
// }
//What is happenning here? 
const count = Reduce2(<T>(acc:number, _:T) => acc + 1, 0);

//And here?
function map2<T, U>(transform: (val: T) => U) {
    return Reduce2<T, U[]>((acc, val) => {
      acc.push(transform(val));
      return acc;
    }, []);
  }
//And here? 
  function filter2<T>(predicate: (val: T) => boolean) {
    return Reduce2<T, T[]>((acc, val) => {
      if (predicate(val)) {
        acc.push(val);
      }
      return acc;
    }, []);
  }
