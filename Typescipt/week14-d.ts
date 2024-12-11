console.log("******************* week 14 ****************************")

type Person = {
    Name: string,
    Age: number
    }
type User = Person & {Id:number, Password: string}

type Admin = User & {kind:"Admin", Extra?: string} //Optional property Extra 
type Member = User & {kind: "Member"}
type Guest = Omit<User, "Id"> & {kind:"Guest"}

const memberUser : Member = {
    Name: "Diana",
    Age: 45,
    Id:1,
    Password:"SomePassword",
    kind: "Member"
}

const adminUser: Admin = {
    Name: "Alice",
    Age: 34,
    Id: 100,
    Password: "securePassword",
    kind: "Admin",
    Extra: "Extra Information"
};

const guestUser: Guest = {
    Name: "Bob",
    Age: 28,
    Password: "guestPassword",
    kind:"Guest"
    };


function GreetUsers(person:Guest|Member|Admin)
{
    if(person.kind!="Guest")
        console.log(person.Id)
    if(person.kind=="Admin")
        console.log(person.Extra)

    console.log(person.Name)
    console.log(person.Age)
    console.log(person.Password)

}

//GreetUsers(adminUser)

function toAdmin(user: User):Admin{
    return{
        // Name: user.Name,
        // Age: user.Age,
        // Id: user.Id,
        // Password: user.Password,
        ...user,
        kind: "Admin",
        Extra: "Some extra while creating admin"
    }
}
let myuser:User = {Name: "Cigdem",
    Age: 38,
    Id: 111,
    Password: "Hellohello"}
    
let myadmin:Admin = toAdmin(myuser)

//const {Extra, kind, Age, Id, Password} = myadmin

function stripAdmin(admin:Admin){
    //So we create a function given the type of the argument, we create that typre of object fomr the given admin
    // ? means it is optional parameter
    return function(newkind?:"Member" | "Guest") : Member|Guest|User {
        const {Extra, kind, ...restofAdmin} = admin
        if(newkind =="Member")
        // {
        //     return {
        //         kind:"Member",
        //         ...restofAdmin
        //     }
        // }
            return {kind:"Member", Name: admin.Name, Id:admin.Id, Password:admin.Password, Age: admin.Age }
        if(newkind =="Guest"){
            const {Id, ...adminwoId} = restofAdmin
            return {kind:"Guest", ...adminwoId}
        }
        return restofAdmin //This is the user     
    }
}

//let myTemp:Guest = stripAdmin(myadmin)("Guest") as Guest
//console.log(myTemp)


function Reduce(fxy:(a:number, b:number)=>number, arr: number[]):number{
    if(arr.length==0) return 0
    let result:number = arr[0];
    for(let i=1; i<arr.length; i++)
      result = fxy(result, arr[i])
    return result
}

// console.log(Reduce(
//     (a,b)=> a+b,
//     [1,2,3,4,5,6]
// ))


//for recursion arr.slice(1)

function ReduceCurried(fxy:(a:number,b:number)=>number){
    return function (arr:number[]):number{
        if(arr.length==0) return 0
        let result:number = arr[0];
        for(let i=1; i<arr.length; i++)
            result = fxy(result, arr[i])
        return result
    }
}


const Sum     = ReduceCurried((a,b)=> a+b);
const Product = ReduceCurried((a,b)=> a*b );
const Max     = ReduceCurried((a,b)=> a>=b ? a : b);
const Min     = ReduceCurried((a,b)=> a<=b ? a : b);

let product = Product([1,2,3,4,5])

//console.log(product)

//Generic reduce
function ReduceG<T>(fxy:(a:T,b:T)=>T){
    return function (arr:T[]):T{
        if(arr.length==0)
             return {} as T  //{} is empty/ This is similar to c# default
        let result:T = arr[0];
        for(let i=1; i<arr.length; i++)
            result = fxy(result, arr[i])
        return result
    }
}

const Concat     = ReduceG<string>((a,b)=> a+b);
const SumG     = ReduceG<number>((a,b)=> a+b);

// console.log(Concat(["Hello", " ", "I", " ", "am  ", "here"]))
// console.log(SumG([1,2,3,4,5]))

//Generic reduce
function ReduceGG<T,R>(fxy:(a:R,b:T)=>R, seed:R){ // Seed is just an initial valur for the result
    return function (arr:T[]):R{
        if(arr.length==0)
             return seed // This is jusy to give an initial value
        //let result:R = arr[0];
        let result:R = seed // This is jusy to give an initial value
        for(let i=0; i<arr.length; i++)
            result = fxy(result, arr[i])   //<T>(acc:number,_:T)=> acc+1 Here R is number and 
        return result
    }
}

const ConcatG     = ReduceGG<string,string>((a,b)=> a+b,"");
const SumGG     = ReduceGG<number,number>((a,b)=> a+b, 0);

// console.log(ConcatG(["Hello", " ", "I", " ", "am  ", "here"]))
// console.log(SumGG([1,2,3,4,5]))

//Try to understand this
const count = ReduceGG(<T>(acc:number,_:T)=> acc+1 , 10)

const myfunc = <T>(acc:number,_:T)=> acc+1
//console.log(myfunc<number>(2,5))  //This returns 3
//console.log(myfunc<string>(275,"7")) //This returns 276
//console.log(myfunc<Person>(10,{Age:3,Name:"Cigdem"})) //This returns 11

console.log(count([1,2,3,4,5,6,7]))
console.log(count([{Age:3,Name:"sdfss"},{Age:3,Name:"fdg"},{Age:3,Name:"gfgfds"},{Age:3,Name:"sgfdg"}]))


//transform: A function that takes a value of type T and returns a value of type U.
function map<T, U>(array: T[], transform: (val: T) => U): U[] {
    const result: U[] = [];
    for (let i = 0; i < array.length; i++) {
      result.push(transform(array[i]));
    }
    return result;
  }

let arr = map<number,string>([1,2,3,4,5],(a:number):string=> ""+a)


const adminUser1: Admin = {
    Name: "Admin1",
    Age: 17,
    Id: 100,
    Password: "securePassword",
    kind: "Admin",
    Extra: "Extra Information"
};
const adminUser2: Admin = {
    Name: "Admin2",
    Age: 34,
    Id: 100,
    Password: "securePassword",
    kind: "Admin",
    Extra: "Extra Information"
};
const adminUser3: Admin = {
    Name: "Admin3",
    Age: 38,
    Id: 100,
    Password: "securePassword",
    kind: "Admin",
    Extra: "Extra Information"
};

let members = map<Admin,Member>([adminUser1,adminUser2,adminUser3],(a:Admin):Member=> stripAdmin(a)("Member") as Member)
//console.log(members)

  function filter<T>(array: T[], predicate: (val: T) => boolean): T[] {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        result.push(array[i]);
      }
    }
    return result;
  }


let adults = filter<Admin>([adminUser1,adminUser2,adminUser3],(a:Admin):boolean => a.Age>=18)
console.log(adults)
