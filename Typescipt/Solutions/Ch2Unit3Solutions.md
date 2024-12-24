```ts
//Unit 3

type None = {kind: "None"}
type Something<T> = {kind:"Some", Value: T}
type Option<T> = None | Something<T>

const none = () : None => ({kind: "None"})
const some = <T>(param: T) : Something<T> => ({kind: "Some", Value: param}) 

type EmptyList = {kind: "empty"}
type FullList<T> = {kind: "full", head: T, tail:List<T>}
type List<T> = EmptyList | FullList<T>

const empty = () : EmptyList => ({kind: "empty"})
const full = <T>(_: T) : (__: List<T>) => FullList<T> => 
              __ => ({kind: "full", head:_, tail: __})
              
const numberList: List<number> = full(2.4)(full(3.4)(full(25)(full(57)(empty()))))
const stringList: List<string> = full("H")(full("A")(full("L")(full("L")(full("O")(empty())))))

const range = (start: number) : (end: number) => List<number> => end =>
   start > end ? empty() : full(start)(range(start + 1)(end))

const numberList2 = range(12)(54)

const printList = <T>(list?: List<T>) : string =>
                                                 list == undefined ? "UNDEFINED": 
                                                 list.kind == "empty" ? "":
                                                 list.tail.kind == "empty"?
                                                 `(${list.head})`:
                                                 `(${list.head}) ; ${printList(list.tail)}`
//1: last element
const last = <T>(list: List<T>) : Option<T> => list.kind == "empty" ? ({kind: "None"}) :
                                               list.tail.kind == "empty"? {kind:"Some", Value: list.head} : 
                                               last(list.tail)   
//2: reverse 
const reverseOld = <T>(oldList: List<T>, newList: List<T>) : List<T> =>
  oldList.kind == "empty" ? empty() : 
                            oldList.tail.kind == "empty" ? full(oldList.head)(newList) : 
                            reverseOld(oldList.tail, full(oldList.head)(newList))

const reverseFunc = <T>(list: List<T>) : (newList: List<T>) => List<T> => newList =>
  list.kind == "empty" ? empty() : 
                         list.tail.kind == "empty" ? full(list.head)(newList) : 
                         reverseFunc(list.tail)(full(list.head)(newList))

const reverse =  <T>(list: List<T>) => reverseFunc(list)(empty())

//3: append
const append = <T>(list1: List<T>) : (list2: List<T>) => List<T> => list2 => 
                  list2.kind == "empty" ? list1 : 
                  list1.kind == "empty" ? list2 : 
                  list1.tail.kind == "empty" ? full(list1.head)(list2):
                  full(list1.head)(append(list1.tail)(list2))

//4: nth element in list
const nth = <T>(n : bigint) : (l : List<T>) => Option<T> => l => 
                  l.kind == "empty" ? {kind: "None"} :
                  n == 1n ? {kind:"Some", Value: l.head} :
                  nth<T>(n - 1n)(l.tail)
                  
//5: is palindrome?
const listEquals = <T>(l1 : List<T>) : (l2 : List<T>) => boolean => l2 =>
                   l1.kind == "empty" && l2.kind == "empty" ||
                   (l1.kind == "full" && l2.kind == "full"  &&
                    l1.head == l2.head) &&
                   listEquals(l1.tail)(l2.tail)
                   
const palindrome = <T>(l : List<T>) : boolean => 
                   (l.kind == "empty" || l.tail.kind == "empty") || 
                   listEquals(l)(reverse(l))

//6: compress
const compress = <T>(l : List<T>) : List<T> => 
                    l.kind == "empty" ? empty() : 
                    l.tail.kind == "empty" ? l : 
                    l.head == l.tail.head ? compress(l.tail) :
                    full(l.head)(compress(l.tail)) 

//7: CaesarCypher
const shiftChar = (c : string) : (shift : number) => string => shift => {
    const charCode = c.charCodeAt(0) 
    if (charCode >= 97 && charCode <= 122)
      return String.fromCharCode(((charCode - 97 + shift) % 26 + 97))
    return String.fromCharCode(charCode)
}

const caesarCypher = (l : List<string>) : (shift : number) => List<string> => shift =>
                      l.kind == "empty" ? empty() :
                      full(shiftChar(l.head)(shift))(caesarCypher(l.tail)(shift))

//8: splitAt                      
const splitAt = <T>(i : number) : (l : List<T>) => [List<T>, List<T>] => l => {
                if(l.kind == "empty") return [empty(), empty()]
                if(i < 0 || i >= listLength(l)) return [empty(), l]
                if(i == 0) return [empty(), l]
                const [left, right] = splitAt<T>(i - 1)(l.tail) 
                return [full(l.head)(left), right]
}    

// 9, 10: Merge, MergeSort

const listLength = <T> (l: List<T>) : number => 
    l.kind == "empty"? 0 : 1 + listLength(l.tail)

const MergeCompact = <T>(l1 : List<T>) : (l2 : List<T>) => List<T> => l2 =>
  l1.kind == "empty"? l2 :
  l2.kind == "empty"? l1 :
  l1.head == l2.head ? full(l1.head)(MergeCompact(l1.tail)(l2.tail)):
  l1.head  < l2.head ? full(l1.head)(MergeCompact(l1.tail)(l2)):
                       full(l2.head)(MergeCompact(l1)(l2.tail))

const Merge = <T>(l1 : List<T>) : (l2 : List<T>) => List<T> => l2 =>
  l1.kind == "empty"? l2 :
  l2.kind == "empty"? l1 :
  //l1.head == l2.head ? full(l1.head)(Merge(l1.tail)(l2.tail)):
  l1.head  < l2.head ? full(l1.head)(Merge(l1.tail)(l2)):
                       full(l2.head)(Merge(l1)(l2.tail))                       

const MergeSort = <T>(l: List<T>) : List<T> =>
  l.kind == "empty" ? l :
  l.tail.kind == "empty" ? l : 
  Merge<T>(MergeSort<T>(splitAt<T>(Math.floor(listLength<T>(l)/2))(l)[0]))
          (MergeSort<T>(splitAt<T>(Math.floor(listLength<T>(l)/2))(l)[1]))
                             
// const List = <T>(array : T[]) : List<T> => {
//   let x : List<T> = { kind : "empty" }
//   for (let i = array.length - 1; i >= 0; i--) {
//     x = {
//       kind: "full",
//       head: array[i],
//       tail: x
//     }
//   }
//   return x
// }

const List = <T>(array : T[]) : List<T> => (array.length == 0) ? 
                                           { kind : "empty" } :
                                           (array.length == 1) ?
                                           {kind: "full", head: array[0], tail: {kind : "empty" } } :
                                           {kind: "full", head: array[0], tail: List(array.slice(1)) }

  
console.log(printList(range(1)(6)))
const lastElement = last(range(1)(352))
console.log(`${lastElement.kind == "None" ? "NO VALUE" : lastElement.Value} `)
const emptyList : List<string> = {kind: "empty"}
const lastElementEmptyList = last(emptyList)
console.log(`${lastElementEmptyList.kind == "None" ? "NO VALUE" : lastElementEmptyList.Value} `)
const reversedList = reverseOld(range(1)(6), empty())
const reversedList2 = reverse(range(1)(6))
console.log(printList(reversedList))
console.log(printList(reverse(range(1)(6))))
console.log(printList(append(range(1)(5))(range(7)(21))))
console.log(printList(append(empty())(range(7)(21))))
console.log(printList(append(range(7)(21))(empty())))

console.log(printList(append(range(1)(5))(empty())))
console.log(nth(5n)(range(1)(10)))
console.log(nth(11n)(range(1)(10)))
const val = nth(5n)(reversedList)
console.log(val.kind == "Some" ? val.Value : "NO VALUE FOUND")
const val2 = nth(50n)(reversedList)
console.log(val2.kind == "Some" ? val2.Value : "NO VALUE FOUND")

console.log(`listEquals(range(1)(29))(range(1)(20)) => ${listEquals(range(1)(29))(range(1)(20))}`)
console.log(`listEquals(range(1)(20))(range(1)(20)) => ${listEquals(range(1)(20))(range(1)(20))}`)
console.log(palindrome(range(1)(10)))
const palindromicList = full("a")(full("b")(full("b")(full("a")(empty()))))
console.log(palindrome(palindromicList))

var compressedList1 = compress(range(5)(25))
console.log(printList(compressedList1))
var compressedList2 = compress(full("a")(full("b")(full("b")(full("b")(full("f")(full("c")(full("c")(full("e")(empty())))))))))
console.log(printList(compressedList2))

const text = full("h")(full("e")(full("l")(full("l")(full("o")(full("b")(full("y")(full("e")(empty()))))))))
console.log(printList(text))
console.log(printList(caesarCypher(text)(2)))
console.log(printList(caesarCypher(text)(4)))
console.log(printList(caesarCypher(text)(7)))

console.log(printList((range(2)(30))))
console.log(`printList(splitAt(-20)(range(2)(30))[0]): ${printList(splitAt(-20)(range(2)(30))[0])}`)
console.log(`printList(splitAt(-20)(range(2)(30))[1]): ${printList(splitAt(-20)(range(2)(30))[1])}`)
console.log(`printList(splitAt(300)(range(2)(30))[0]): ${printList(splitAt(300)(range(2)(30))[0])}`)
console.log(`printList(splitAt(300)(range(2)(30))[1]): ${printList(splitAt(300)(range(2)(30))[1])}`)

const index = 15
console.log(`printList(splitAt(${index})(range(2)(30))[0]): ${printList(splitAt(index)(range(2)(30))[0])}`)
console.log(`printList(splitAt(${index})(range(2)(30))[1]): ${printList(splitAt(index)(range(2)(30))[1])}`)
const mergedList = Merge(range(1)(20))(range(2)(30))
console.log(`\nMerge: \n ${printList(mergedList)}\n\n`)
console.log(listLength(mergedList))
const listtoSort = append(range(3)(15))(range(3)(20))
const charListToSort = full("h")(full("a")(full("l")(full("l")(full("o")(full("b")(full("y")(full("e")(empty()))))))))
console.log(printList(listtoSort))
console.log(`\nMergeCompact: \n${printList(MergeCompact(range(3)(15))(range(3)(20)))}\n`)
console.log(`\nMerge: \n${printList(Merge(range(3)(15))(range(3)(20)))}\n`)
console.log(`\nMergeSort: \n${printList(MergeSort(append(range(3)(15))(range(3)(20))))}\n`)
console.log(`List: \n${printList(charListToSort)}\nSorted:\n${printList(MergeSort(charListToSort))}\n`)
console.log()



// 11 Eval

type Value = number | string

// type ExpressionBase = 
// {AtomicValue: Value, kind: "Atomic"} | 
// {Add:  [Expression, Expression], kind: "Add"} |
// {Sub:  [Expression, Expression], kind: "Sub"} |
// {Mul:  [Expression, Expression], kind: "Mul"} |
// {Div:  [Expression, Expression], kind: "Div"} |
// {Mod:  [Expression, Expression], kind: "Mod"} 
// type Expression = ExpressionBase & {
//   Eval : () => Expression,
//   PrintExpression : () => string
// }

type Atomic = {AtomicValue: Value, kind: "Atomic"}
type Expression = (
                    Atomic | 
                    {Add:  [Expression, Expression], kind: "Add"} |
                    {Sub:  [Expression, Expression], kind: "Sub"} |
                    {Mul:  [Expression, Expression], kind: "Mul"} |
                    {Div:  [Expression, Expression], kind: "Div"} |
                    {Mod:  [Expression, Expression], kind: "Mod"} 
                  )
                  & 
                  {
                    Eval : () => Expression,
                    EvalStack : () => (stack? : List<[string, number]>) => Expression // exercises 12, 13
                    PrintExpression : () => string
                  }

const isAtomic = (_: Expression): boolean => _.kind == "Atomic"            
//const isNumber = (_ : Value) => typeof(_) == typeof(0)
const isNumber = (_ : Value) => typeof(_) == 'number'

const AValue = (_: Value) : Expression => ({AtomicValue: _, kind: "Atomic", Eval: Eval, EvalStack: EvalStack,PrintExpression : PrintExpression})
const AsAtomicValue = (_: Value) : Atomic => ({AtomicValue: _, kind: "Atomic"})
const Add = (ex1: Expression) : (ex2: Expression) =>  Expression => ex2 => ({Add:  [ex1, ex2], kind: "Add", Eval: Eval, EvalStack: EvalStack, PrintExpression : PrintExpression})
const Sub = (ex1: Expression) : (ex2: Expression) =>  Expression => ex2 => ({Sub:  [ex1, ex2], kind: "Sub", Eval: Eval, EvalStack: EvalStack,PrintExpression : PrintExpression})
const Mul = (ex1: Expression) : (ex2: Expression) =>  Expression => ex2 => ({Mul:  [ex1, ex2], kind: "Mul", Eval: Eval, EvalStack: EvalStack,PrintExpression : PrintExpression})
const Div = (ex1: Expression) : (ex2: Expression) =>  Expression => ex2 => ({Div:  [ex1, ex2], kind: "Div", Eval: Eval, EvalStack: EvalStack,PrintExpression : PrintExpression})
const Mod = (ex1: Expression) : (ex2: Expression) =>  Expression => ex2 => ({Mod:  [ex1, ex2], kind: "Mod", Eval: Eval, EvalStack: EvalStack,PrintExpression : PrintExpression})

function Eval(this: Expression) : Expression {
  switch(this.kind) {
    case "Atomic":
      return this  
    case "Add":
    { 
      const l = this.Add[0].Eval()
      const r = this.Add[1].Eval()
      if(l.kind == "Atomic" && r.kind == "Atomic")
      return (isNumber(l.AtomicValue) && isNumber(l.AtomicValue)) ? 
              AValue((l.AtomicValue as number) + (r.AtomicValue as number)) :
              AValue("" + (l.AtomicValue) + (r.AtomicValue))    
    }
    break
    case "Sub": 
    {
      const l = this.Sub[0].Eval()
      const r = this.Sub[1].Eval()
      if(l.kind == "Atomic" && r.kind == "Atomic")
        return (isNumber(l.AtomicValue) && isNumber(r.AtomicValue)) ? 
                AValue((l.AtomicValue as number) - (r.AtomicValue as number)) :
                AValue("INVALID EXPR")
    }
    break  
    case "Mul": 
          {
      const l = this.Mul[0].Eval()
      const r = this.Mul[1].Eval()
      if(l.kind == "Atomic" && r.kind == "Atomic")
        return (isNumber(l.AtomicValue) && isNumber(r.AtomicValue)) ? 
                AValue((l.AtomicValue as number) * (r.AtomicValue as number)) :
                AValue("INVALID EXPR")
    }  
    break 
    case "Div": 
          {
      const l = this.Div[0].Eval()
      const r = this.Div[1].Eval()
      if(l.kind == "Atomic" && r.kind == "Atomic")
        return (isNumber(l.AtomicValue) && isNumber(r.AtomicValue)) ? 
                AValue((l.AtomicValue as number) / (r.AtomicValue as number)) :
                AValue("INVALID EXPR")
    } 
    break       
    case "Mod": 
    {
      const l = this.Mod[0].Eval()
      const r = this.Mod[1].Eval()
      if(l.kind == "Atomic" && r.kind == "Atomic")
        return (isNumber(l.AtomicValue) && isNumber(r.AtomicValue)) ? 
                AValue((l.AtomicValue as number) % (r.AtomicValue as number)) :
                AValue("INVALID EXPR")
    }  
    break
    default: 
      return AValue(0) 
  }
  return AValue(0) 
}

// 12 EvalStack (Eval with lookup in the stack) 

//contains:
//checks if the list l contains the value of el in the first element of the pairs
//in case of the list of bindings List<[string, number]> 
//el is a string and represents the variable name.

const contains = <T1, T>(l: List<[T1, T]>) : (el: T1) => boolean => el =>
  l.kind == "empty" ? false :
  l.head[0] == el ? true :
  contains(l.tail)(el)  

//evalVar:
//in the list l it looks for a list head containing the value of el in the first element of the pairs,
//this method returns an Option<T> containing the value of the second element of the pair:
// Some<T> in case found, None otherwise.  
//In case of the list of bindings List<[string, number]> 
//el is a string and represents the variable name, 
//this method returns an Option<number> containing the value of the variable if found.

const evalVar = <T1, T>(l?: List<[T1, T]>) : (el: T1) => Option<T> => el =>
           l == undefined || l.kind == "empty" ? none() :
           l.head[0] == el ? some(l.head[1]) :
           evalVar(l.tail)(el)

function EvalStack(this: Expression) : (stack? : List<[string, number]>) => Expression {
  return stack => {
    if(stack == undefined) return this.Eval()
    switch(this.kind) {
      case "Atomic":
        return this  
      case "Add":
      { 
        const l = this.Add[0].EvalStack()(stack)
        const r = this.Add[1].EvalStack()(stack)
        if(l.kind == "Atomic" && r.kind == "Atomic") {
          const lValue = !isNumber(l.AtomicValue) && evalVar(stack)(l.AtomicValue as string).kind != "None" ? 
                         AsAtomicValue((evalVar(stack)(l.AtomicValue as string) as Something<number>).Value) : l
          const rValue = !isNumber(r.AtomicValue) && evalVar(stack)(r.AtomicValue as string).kind != "None" ? 
                         AsAtomicValue((evalVar(stack)(r.AtomicValue as string) as Something<number>).Value) : r             
          return (isNumber(lValue.AtomicValue) && isNumber(rValue.AtomicValue)) ? 
                  AValue((lValue.AtomicValue as number) + (rValue.AtomicValue as number)) :
                  AValue("" + (lValue.AtomicValue) + (rValue.AtomicValue))    
        }
      }
      break
      case "Sub": 
      {
        const l = this.Sub[0].EvalStack()(stack)
        const r = this.Sub[1].EvalStack()(stack)
        if(l.kind == "Atomic" && r.kind == "Atomic") {
          const lValue = !isNumber(l.AtomicValue) && evalVar(stack)(l.AtomicValue as string).kind != "None" ? 
                         AsAtomicValue((evalVar(stack)(l.AtomicValue as string) as Something<number>).Value) : l
          const rValue = !isNumber(r.AtomicValue) && evalVar(stack)(r.AtomicValue as string).kind != "None" ? 
                         AsAtomicValue((evalVar(stack)(r.AtomicValue as string) as Something<number>).Value) : r             
          return (isNumber(lValue.AtomicValue) && isNumber(rValue.AtomicValue)) ? 
                  AValue((lValue.AtomicValue as number) - (rValue.AtomicValue as number)) :
                  AValue("INVALID EXPR")
        }
      }
      break  
      case "Mul": 
      {
        const l = this.Mul[0].EvalStack()(stack)
        const r = this.Mul[1].EvalStack()(stack)
        if(l.kind == "Atomic" && r.kind == "Atomic") {
          const lValue = !isNumber(l.AtomicValue) && evalVar(stack)(l.AtomicValue as string).kind != "None" ? 
                         AsAtomicValue((evalVar(stack)(l.AtomicValue as string) as Something<number>).Value) : l
          const rValue = !isNumber(r.AtomicValue) && evalVar(stack)(r.AtomicValue as string).kind != "None" ? 
                         AsAtomicValue((evalVar(stack)(r.AtomicValue as string) as Something<number>).Value) : r             
          return (isNumber(lValue.AtomicValue) && isNumber(rValue.AtomicValue)) ? 
                  AValue((lValue.AtomicValue as number) * (rValue.AtomicValue as number)) :
                  AValue("INVALID EXPR") 
        }
      }  
      break 
      case "Div": 
      {
        const l = this.Div[0].EvalStack()(stack)
        const r = this.Div[1].EvalStack()(stack)
        if(l.kind == "Atomic" && r.kind == "Atomic") {
          const lValue = !isNumber(l.AtomicValue) && evalVar(stack)(l.AtomicValue as string).kind != "None" ? 
                         AsAtomicValue((evalVar(stack)(l.AtomicValue as string) as Something<number>).Value) : l
          const rValue = !isNumber(r.AtomicValue) && evalVar(stack)(r.AtomicValue as string).kind != "None" ? 
                         AsAtomicValue((evalVar(stack)(r.AtomicValue as string) as Something<number>).Value) : r             
          return (isNumber(lValue.AtomicValue) && isNumber(rValue.AtomicValue)) ? 
                  AValue((lValue.AtomicValue as number) / (rValue.AtomicValue as number)) :
                  AValue("INVALID EXPR") 
        }
      } 
      break       
      case "Mod": 
      {
        const l = this.Mod[0].Eval()
        const r = this.Mod[1].Eval()
        if(l.kind == "Atomic" && r.kind == "Atomic") {
          const lValue = !isNumber(l.AtomicValue) && evalVar(stack)(l.AtomicValue as string).kind != "None" ? 
                         AsAtomicValue((evalVar(stack)(l.AtomicValue as string) as Something<number>).Value) : l
          const rValue = !isNumber(r.AtomicValue) && evalVar(stack)(r.AtomicValue as string).kind != "None" ? 
                         AsAtomicValue((evalVar(stack)(r.AtomicValue as string) as Something<number>).Value) : r             
          return (isNumber(lValue.AtomicValue) && isNumber(rValue.AtomicValue)) ? 
                  AValue((lValue.AtomicValue as number) % (rValue.AtomicValue as number)) :
                  AValue("INVALID EXPR")
        }
      }  
      break
      default: 
        return AValue(0) 
    }
    return AValue(0) 
  }
  return Eval
}

const PrettyPrint = (opSymbol : string) : (left : Value) => (right : Value) => string =>
  left => right => `(${left} ${opSymbol} ${right})`

const PrettyPrintAtomic = (opSymbol : string) : (left : Value) => (right : Value) => (flagL : boolean) => (flagR : boolean) => string =>
  left => right => flagL => flagR =>
    `(${flagL ? left : `\"${left}\"`} ${opSymbol} ${flagR ? right : `\"${right}\"`})`

function PrintExpression(this: Expression) : string {
  switch(this.kind) {
    case "Atomic":
      return isNumber(this.AtomicValue) ? this.AtomicValue.toString() : `\"${this.AtomicValue}\"`
    case "Add":
    {  
      const l = this.Add[0].PrintExpression()
      const r = this.Add[1].PrintExpression()
      return PrettyPrint("+")(l)(r) 
    }
    case "Sub": 
    {
      const l = this.Sub[0].PrintExpression()
      const r = this.Sub[1].PrintExpression()
      return PrettyPrint("-")(l)(r) 
    }
    case "Mul": 
          {
      const l = this.Mul[0].PrintExpression()
      const r = this.Mul[1].PrintExpression()
      return PrettyPrint("*")(l)(r) 
    }  
    case "Div": 
          {
      const l = this.Div[0].PrintExpression()
      const r = this.Div[1].PrintExpression()
      return PrettyPrint("/")(l)(r) 
    }    
    case "Mod": 
    {
      const l = this.Mod[0].PrintExpression()
      const r = this.Mod[1].PrintExpression()
      return PrettyPrint("%")(l)(r) 
    }  
    default: 
      return "INVALID EXPR"
  }
}

// 13 List of Statements -> program

//findPos: returns the position starting from 0 of the element el in the list, 
//-1 in case not found

const findPos = <T1, T>(l: List<[T1, T]>) : (el: T1) => number => el =>
  !contains(l)(el) ? -1 :
  l.kind == "empty" ? -1 :
  l.head[0] == el ? 0 :
  1 + findPos(l.tail)(el)

//modifyAt: returns two lists resulting from splitting el at position i,
//where the head of the first node in the second list will contain the value of input el.
//This lambda is very similar to splitAt, except for the second list as explained above.

const modifyAt = <T>(i : number) : (l : List<T>) => (el: T)=> [List<T>, List<T>] => l => el => {
    if(l.kind == "empty") return [empty(), empty()]
    if(i < 0 || i >= listLength(l)) return [empty(), l]
    if(i == 0) return [empty(), full(el)(l.tail)]
    const [left, right] = modifyAt<T>(i - 1)(l.tail)(el) 
    return [full(l.head)(left), right]
} 


//listUpdater:
//Using method modifyAt, findPos and append it is possible to return an updated List.

const listUpdater = <T1, T>(list : List<[T1, T]>) : (el: [T1, T]) => List<[T1, T]> => el => {
                          const [l, r] = modifyAt<[T1, T]>(findPos(list)(el[0]))(list)(el)
                          return append(l)(r)
                        }

type Statement = { 
                   Var: string,
                   Expr: Expression
                   assign: (this: Statement) => (stack? : List<[string, number]>) => (List<[string, number]> | undefined) 
                 }

const statement = (v: string) : (ex: Expression) => Statement => ex => ({Var: v, Expr: ex, assign: assign })

function assign(this: Statement) : (stack? : List<[string, number]>) => (List<[string, number]> | undefined) {
  return stack => {
    const exprEval = this.Expr.EvalStack()(stack)
    const exprRes = exprEval.kind == "Atomic" ? exprEval.AtomicValue : "NO RESULT"
    if(isNumber(exprRes)) {
      const stackElement : [string, number] = [this.Var, exprRes as number]
      if(stack == undefined) return full(stackElement)(empty())
      else if (contains(stack)(this.Var)) {
        /*  
        const pos = findPos(stack)(this.Var)  
        const [l1, l2] = modifyAt<[string, number]>(pos)(stack)(stackElement)  
        return append(l1)(l2)
        */
        return listUpdater(stack)(stackElement)
      }                                 
      return full(stackElement)(stack)
    }
    return stack  
  }
} 

//run: 
const run = (program : List<Statement>) : (stack : List<[string, number]> | undefined) => (List<[string, number]> | undefined )=> 
  stack => program.kind == "empty" ? stack :
           run(program.tail)(program.head.assign()(stack))

const printProgramFunc = (program : List<Statement>) : (l : number) => string => 
  l => 
      program.kind == "empty" ? "No Program" :
      program.tail.kind == "empty" ? `${l})  ${program.head.Var} = ${program.head.Expr.PrintExpression()}` :
      `${l})  ${program.head.Var} = ${program.head.Expr.PrintExpression()}\n` + printProgramFunc(program.tail)(l + 1)         

const printProgram = (program : List<Statement>) : string =>  printProgramFunc(program)(1)

//Test
const aValue : Expression = AValue(12786)
console.log(aValue)
console.log(aValue.kind == "Atomic" ? aValue.AtomicValue : "<NO VALUE>")

const expr1: Expression = Div(Mul(AValue(10))(Sub(AValue(20))(Add(AValue(-3))(Add(AValue(2))(AValue(5))))))(AValue(2))
const res_Expr1 = expr1.Eval()
console.log(res_Expr1.kind=="Atomic"? res_Expr1.AtomicValue : "<NO VALUE>")

const expr2: Expression = Add(AValue(-3))(Add(AValue(2))(Add(AValue("5"))(AValue("2"))))
const res_Expr2 = expr2.Eval()
console.log(res_Expr2.kind=="Atomic"? res_Expr2.AtomicValue : "<NO VALUE>")

const expr3: Expression = Div(Mul(AValue(10))(Sub(AValue(20))(Add(AValue(-3))(Add(AValue("a"))(AValue("z"))))))(AValue(2))
const expr3_1: Expression = Mul(Div(AValue(10))(Sub(AValue(20))(Add(AValue(-3))(Add(AValue(2))(AValue(5))))))(AValue(2))
const expr3_2: Expression = Div(Mul(AValue(10))(Sub(AValue(20))(Add(AValue(-3))(Add(AValue(2))(AValue(5))))))(AValue(2))
const expr4: Expression = Mul(expr3_2)(expr3_1)
const res_Expr3 = expr3.Eval()
console.log(res_Expr3.kind=="Atomic"? res_Expr3.AtomicValue : "<NO VALUE>")

console.log(PrettyPrint(">>")(2345)("log.txt"))
console.log(PrettyPrintAtomic(">>")("2345")("log.txt")(isNumber("2345"))(isNumber("log.txt")))
console.log(expr1.PrintExpression())
console.log(expr2.PrintExpression())
console.log(expr3.PrintExpression())
console.log(expr3_1.PrintExpression())
console.log(expr3_2.PrintExpression())
const valExpr3_1 = expr3_1.Eval()
console.log(`${expr3_1.PrintExpression()} = ${valExpr3_1.kind=="Atomic"? valExpr3_1.AtomicValue : "<NO VALUE>"} `)
const valExpr3_2 = expr3_2.Eval()
console.log(`${expr3_2.PrintExpression()} = ${valExpr3_2.kind=="Atomic"? valExpr3_2.AtomicValue : "<NO VALUE>"} `)
const valExpr4 = expr4.Eval()
const test0 = "kind" in valExpr4
const test1 = "AtomicValue" in valExpr4
const test3 = valExpr4.kind=="Atomic"
const test4 = isAtomic(expr4)
const test5 = isAtomic(valExpr4)


console.log(`${expr4.PrintExpression()} = ${expr4.Eval().kind=="Atomic"? (expr4.Eval() as Atomic).AtomicValue : "<NO VALUE>"} `)

const aList : List<[string, number]> = List([["a", 2], ["b", 3], ["c", 5], ["d", 4]])   
console.log(printList(aList))
console.log(contains(aList)("a"))
console.log(evalVar(aList)("a")) 
console.log(contains(aList)("f"))   
console.log(evalVar(aList)("f"))  

console.log(`${expr3.PrintExpression()} = ${expr3.EvalStack()(aList).kind=="Atomic"? (expr3.EvalStack()(aList) as Atomic).AtomicValue : "<NO VALUE>"} `)
const expr5: Expression = Div(Mul(AValue("d"))(Sub(AValue(20))(Add(AValue(-3))(Add(AValue("a"))(AValue("b"))))))(AValue(2))
console.log(`${expr5.PrintExpression()} = ${expr5.EvalStack()(aList).kind=="Atomic"? (expr5.EvalStack()(aList) as Atomic).AtomicValue : "<NO VALUE>"} `)
console.log(printList(aList))


const varAssignment = statement("v")(Add(AValue("a"))(AValue("b")))
const stack = varAssignment.assign()(aList)
console.log()

const aVar : [string, number] = ["w", 3000]
const aVar2 : [string, number] = ["a", 4650]
const pos = findPos(aList)(aVar[0])
const [l1, l2] = modifyAt<[string, number]>(pos)(aList)(aVar)
const newStack = append(l1)(l2)
const pos2 = findPos(aList)(aVar2[0])
const [l1_2, l2_2] = modifyAt<[string, number]>(pos2)(aList)(aVar2)
const newStack2_1 = append(l1_2)(l2_2)
const newStack1 = listUpdater(aList)(aVar)
const newStack2_2 = listUpdater(aList)(aVar2)
console.log(printList(aList))
console.log(printList(newStack))
console.log(printList(newStack1))
console.log(printList(newStack2_1))
console.log(printList(newStack2_2))

const varAssignment1 = statement("v")(Add(AValue("d"))(AValue(5)))
const stack1 = varAssignment1.assign()(aList)
console.log(printList(aList))
console.log(printList(stack1))

const varAssignment2 = statement("a")(Add(AValue("a"))(AValue(20)))
const stack2 = varAssignment2.assign()(aList)
console.log(printList(aList))
console.log(printList(stack2))

const varAssignment3 = statement("a")(expr5)
const varAssignment4 = statement("v2")(AValue(354))
const varAssignment5 = statement("v3")(expr3_1)
//const program = full(varAssignment1)(full(varAssignment2)(full(varAssignment3)(empty())))
const program = List([varAssignment1, varAssignment2, varAssignment3, varAssignment4, varAssignment5])
console.log("\n------Program:------")
console.log(printProgram(program))
console.log("--------------------\n")
const stack3 = run(program)(aList)
console.log("Memory Before: " + printList(aList))
console.log("Memory After:  " + printList(stack3))
```