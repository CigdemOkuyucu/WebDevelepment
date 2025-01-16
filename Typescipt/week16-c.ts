console.log("week 16")

type User = {
    readonly username: string;
    online: boolean;
  }

//function to create users
const createUser = (username:string, online:boolean=false):User =>{
    return{username, online}
}
//=> ({username, online});  

const usersDatabase: User[] = [
    createUser("Alice"), 
    createUser("Bob", true), 
    createUser("Charlie")
]


function findUserByName(Name: string): User | undefined // here undefined is undesired
{
  //return usersDatabase.find(user => user.username === Name);
  const user = usersDatabase.find((user) => user.username === Name);
  //find method returns undefined when it can not find the matching element
  
  if (user) 
    return user
   else 
    return undefined; 
}

//console.log(findUserByName("cigdem"))


//To reduce  runtime errors caused by null or undefined we use Options
//Options are necessary for functional programming
type Option<T> = {
    kind:"none" //this representing the undefined
} | {
    kind: "some",   // this is repsenting a value
    value: T
}

function findUser(Name: string): Option<User>
  {
    //return usersDatabase.find(user => user.username === Name);
    const user = usersDatabase.find((user) => user.username === Name);
    if (user) 
      return {kind:"some", value: user} //create an option record of type "some"
     else 
      return {kind: "none"}; //create an option record of type "none"
  }

//console.log(findUser("Alice"))


// //Another Example
type Empty<T> = {kind:"empty"}
type Full<T> = {kind:"full", value:T, tail: List<T>}
type List<T> = Empty<T> | Full<T>


createEmpty : a function to create an empty list
function createEmpty<T>():List<T>{
    return {kind:"empty"}
}

const createEmpty: <T>()=>List<T> =() => ({kind:"empty"})
console.log(createEmpty())


// //addElement : a function to add element to an existing list 
function addElement<T>(val:T):(tail:List<T>)=>List<T>{
    return function(rest:List<T> = createEmpty()):List<T>{
        return {kind:"full", value:val, tail:rest}
    }
}

const addElement :<T>(val:T)=>(tail:List<T>)=>List<T>
     = <T>(val:T) => (rest:List<T> = createEmpty()):List<T> => ({kind:"full", value:val, tail:rest})

console.log(addElement(4)(createEmpty()))

const numList:List<number> = addElement(88)(addElement(1)(addElement(2)(addElement(3)(createEmpty()))))

//console.log(numList)
const str= JSON.stringify(numList)

//console.log(str)

console.log(JSON.stringify(numList, 
    (key, value)=> key=='kind' || 
                   value===null? undefined:value, 2))


// //Unit 3

type None = {kind: "None"}
type Something<T> = {kind:"Some", Value: T}
type Opt<T> = None | Something<T>

type EmptyLst = {kind: "empty"}
type FullLst<T> = {kind: "full", head: T, tail:Lst<T>}
type Lst<T> = EmptyLst | FullLst<T>


// //Exercise 1
const last: <T>(l : Lst<T>)=> Opt<T> = <T>(l : Lst<T>) => 
    (l.kind === "empty") ? ({kind: "None"}):
        (l.tail.kind === "empty") ? ({kind:"Some", Value: l.head}):
        last(l.tail)



// console.log("------------------------------------------------")



type List2<T> = { 
  kind: "empty" 
}
| { 
  kind: "list",
  head: T,
  tail: List2<T>
}

let mynumbers: List2<number> = 
  {kind:"list", head:5,
    tail: {kind:"list",head:6,
        tail:{kind:"list", head:7,
          tail:{kind:"list",head:8,tail:{kind:"empty"}}
        }} }

// {} is undefined
let emptylist:List2<number> = {kind:"empty"}

//console.log(mynumbers)
//console.log(JSON.stringify(mynumbers))

const printList = <T>(list:List2<T>) =>{
    if(list.kind==="empty") return
    console.log(list.head)
    printList(list.tail)
    return
}

printList(mynumbers)

export const List2 = <T>(array : T[]) : List2<T> => {
  let x : List2<T> = { kind : "empty" }
  for (let i = array.length - 1; i >= 0; i--) {
    x = {
      kind: "list",
      head: array[i],
      tail: x
    }
  }
  return x
}
//Create recusrively the list from array
export const ListR = <T>(array : T[]) : List2<T> => {
  if(array.length == 0)
    return {kind:"empty"}
  return {kind:"list", head: array[0], tail:ListR(array.slice(1))}
}
const mylistfromarray = ListR<number>([4,5,6,7,8])

//Write a print method recursviely for the List2

export const printList = <T>(list: List2<T>)=> 
{
    if(list.kind=="empty") return 
    console.log(list.head)
    printList<T>(list.tail) 
    return 
}

console.log(JSON.stringify(mylistfromarray))
//console.log([3,4,5,6,7,8].slice(1)) 

printList(mylistfromarray)