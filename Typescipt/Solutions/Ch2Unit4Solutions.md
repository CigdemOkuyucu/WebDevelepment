```ts

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

type Pair<a,b> = [a,b]

//List Utils:
const range = (start: number) : ((end: number) => List<number>) => end =>
  start > end ? empty() : full(start)(range(start + 1)(end))

const List = <T>(array : T[]) : List<T> => (array.length == 0) ? 
                                          empty() :
                                          (array.length == 1) ?
                                          full(array[0])(empty()) :
                                          full(array[0])(List(array.slice(1)))

const printList = <T>(list?: List<T>) : string =>
  list == undefined ? "UNDEFINED": 
  list.kind == "empty" ? "":
  list.tail.kind == "empty"?
  `(${list.head})`:
  `(${list.head}) ; ${printList(list.tail)}`

//Unit 3
//1: last element
const last = <T>(list: List<T>) : Option<T> => list.kind == "empty" ? ({kind: "None"}) :
                                              list.tail.kind == "empty"? {kind:"Some", Value: list.head} : 
                                              last(list.tail)   
//2: reverse 

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

//Palindrome
//reverse; listEquals  

const isPalindrome = <T>(l :List<T>) : boolean => ListEquals(l)(reverse(l))

const ListEquals = <T>(l1 :List<T>) : ((l2 :List<T>) => boolean) =>
  l2 => 
        l1.kind == "empty" && l2.kind == "empty" ||
        l1.kind == "full" && l2.kind == "full" &&
        l1.head == l2.head &&
        ListEquals(l1.tail)(l2.tail)

const ListEquals_ = <T>(l1 :List<T>, l2 :List<T>) : boolean => {
        if(l1.kind == "empty" && l2.kind == "empty") return true
        else if (l1.kind == "full" && l2.kind == "full")
            return l1.head == l2.head && ListEquals_(l1.tail, l2.tail)
        return false
      }


// const compress = <T>(l : List<T>) : List<T> => 
//   l.kind == "empty" ? l :
//   l.tail.kind == "empty" ? l :
//   l.head == l.tail.head ? compress(l.tail) :
//   full(l.head)(compress(l.tail))

const compress = <T>(l : List<T>) : List<T> => {
  if(l.kind == "empty") return l
  else if(l.tail.kind == "empty") return l 
  else if(l.head == l.tail.head) return compress(l.tail)
  return full(l.head)(compress(l.tail))
}

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

                                          
//Unit 4

type BasicFunc<T1, T2> = (_:T1) => T2

type Fun<input, output> = 
  BasicFunc<input, output> &
  {
    then: <nextOutput>(other:BasicFunc<output, nextOutput>) => Fun<input, nextOutput>
  }

const Fun = <input, output>(actual: BasicFunc<input, output>) : Fun<input, output> => {
  const f = actual as Fun<input, output>
  f.then = function<nextOutput>(this: Fun<input, output>, other: BasicFunc<output, nextOutput>) : 
          Fun<input, nextOutput>        
          {
              return Fun((input: input) => other(this(input)))
          }       
  return f
}

const id = <T>() => Fun<T, T> ((x: T) => x)

//Nested List:
export type ListElement<T> = {
  kind: "element",
  value: T
} | {
  kind: "nested list",
  nestedList: List<ListElement<T>>
}
                                  
const el = <T> (_ : T) : ListElement<T> => ({ kind: "element", value: _})
const nestedListOneElement = <T> (_ : ListElement<T>) : ListElement<T> => ({ kind: "nested list", nestedList: full(_)(empty())})
const AddElToNestedListElement = <T> (_: T) : (__ : List<ListElement<T>>) => ListElement<T> => __=> ({ kind: "nested list", nestedList: full(el(_))(__)})
const AddToNestedList = <T> (_ : ListElement<T>) : (__ : List<ListElement<T>>) => List<ListElement<T>> => __=> full(_)(__)
//----------

//Map, Filter, Fold on Lists:
const mapList = <U, V> (f: BasicFunc<U, V>) : (l: List<U>) => List<V> => l => 
  l.kind == "empty" ? empty() : full(f(l.head))(mapList(f)(l.tail))

//tests:
const numberList = mapList<number, number>(_ => _ + 1)(List([20, 34, 56, 12]))
const stringList = mapList<number, string>(_ =>  `val: ${_}` )(List([20, 34, 56, 12]))
console.log(printList(numberList))
console.log(printList(stringList))

const filterList_ = <U> (p: (_: U) => boolean) : (l: List<U>) => List<U> => 
  l =>
    l.kind == "empty" ? empty() : 
    p(l.head)? full(l.head)(filterList_(p)(l.tail)) : 
    filterList_(p)(l.tail)

const filterList = <U> (p: BasicFunc<U, boolean>) : BasicFunc<List<U>, List<U>> => 
  l =>
      l.kind == "empty" ? empty() : 
      p(l.head)? full(l.head)(filterList(p)(l.tail)) : 
      filterList(p)(l.tail)   

//tests:
console.log(printList(filterList((_: number) => _ % 2 == 0)(List([1, 4, 6, 7, 21, 64, 78, 11, 20]))))
console.log(printList(filterList((_: string) => _.startsWith("a"))(List(["a", "aa", "baa", "bb"]))))

const foldList = <U, V>(z: V) : (f: ((_: U) => (__: V) => V)) => (l: List<U>) => V => f => l =>
  l.kind == "empty" ? z : f(l.head)(foldList<U,V>(z)(f)(l.tail))

const foldList2 = <U, V>(z: V) : (f: ((_: U) => (__: V) => V)) => (l: List<U>) => V => f => l =>
  l.kind == "empty" ? z : foldList2<U, V>(f(l.head)(z))(f)(l.tail)

//tests:
console.log(foldList<number, number>(0)(x => y => x + y)(List([20, 34, 56, 12])))
console.log(foldList<string, string>("")(x => y => x + y)(List(["h", "e", "l", "l", "o"])))
console.log(foldList<number, string>("")(x => y => x + ", " + y)(List([20, 34, 56, 12])))
console.log(foldList2<number, number>(0)(x => y => x + y)(List([20, 34, 56, 12])) )


//--------- Exercises 1, 2 ----------
// mapList and filterList using only foldList

const mapListFold = <U, V> (f: (_ : U) => V) : (l: List<U>) => List<V> => l =>  
  foldList<U, List<V>>(empty())( _ => __ => full(f(_))(__))(l)

const filterListFold = <U> (p: (_: U) => boolean) : (l: List<U>) => List<U> => l =>
  foldList<U, List<U>>(empty())( _ => __ => p(_)? full(_)(__) : __ )(l)

//tests:
const numberList1 = mapListFold<number, number>(_ => _ + 1)(List([20, 34, 56, 12]))
const stringList1 = mapListFold<number, string>(_ =>  `val: ${_}` )(List([20, 34, 56, 12]))
console.log("\n--- mapList and filterList using only foldList--- \n")
console.log(printList(numberList1))
console.log(printList(stringList1))
console.log(printList(filterListFold((_: number) => _ % 2 == 0)(List([1, 4, 6, 7, 21, 64, 78, 11, 20]))))
console.log(printList(filterListFold((_: string) => _.startsWith("a"))(List(["a", "aa", "baa", "bb"]))))


//Same as append (unit 3)
const concat = <T>(list1 : List<T>) : (list2 : List<T>) => List<T> => list2 => {
  if (list1.kind == "empty") {
    return list2
  }
  return full(list1.head)(concat(list1.tail)(list2))

  // {
  //   kind: "full",
  //   head: list1.head,
  //   tail: concat(list1.tail)(list2)
  // }
}

const concat_ = <T>(list1 : List<T>) : (list2 : List<T>) => List<T> => list2 =>
    list1.kind == "empty" ? list2 : full(list1.head)(concat_(list1.tail)(list2))

//To Flatten a Nested List (type: List<ListElement<T>>)

const flatten = <T>(list : List<ListElement<T>>) : List<T> => {
  if (list.kind == "empty") {
    return { kind : "empty" }
  }
  if (list.head.kind == "element") {
    return full(list.head.value)(flatten(list.tail))

    // {
    //   kind: "full",
    //   head: list.head.value,
    //   tail: flatten(list.tail)
    // } 
  }
  return concat(flatten(list.head.nestedList))(flatten(list.tail))
}

const list1 : List<ListElement<number>> = List([el(2), el(3), el(7), el(1), el(21)])  
const list2 : List<ListElement<number>> = List([el(42), el(31), el(125), el(215), el(52), nestedListOneElement(el(2)), AddElToNestedListElement(234)(list1), el(573),])                                        
const list3 = AddToNestedList(AddElToNestedListElement(134)(list1))(list2)
const res = flatten(list3)
console.log(printList(res))

//Exercise 3
//Implement a function that flattens a list of lists into a single list using fold.

//  const flattenFold = <T>(list : List<ListElement<T>>) : List<T> => 
//    foldList<ListElement<T>, List<T>>(empty())( (_: ListElement<T>) : (__: List<T>) => List<T> => 
//                                                   __ => _.kind == "element" ?
//                                                   full(_.value)(__) : concat(flattenFold(_.nestedList))(__))
//                                     (list)

const flattenFold = <T>(list : List<ListElement<T>>) : List<T> => 
  foldList<ListElement<T>, List<T>>(empty())(
    _ => __ => _.kind == "element" ? 
    full(_.value)(__) : 
    concat(flattenFold(_.nestedList))(__)
  )(list)

console.log("\n--- flatten using only foldList--- ")
const res1 = flattenFold(list3)
console.log(printList(res1))

//Exercise 4
//Implement a function that applies `f : a => b => c` to two lists of equal length `l1:List<a>` and `l2:List<b>`. 
//If the two lists have different length, the shortest is leading.

const listFunc = <a, b, c> (f: Fun<a, Fun<b, c>>) : ((l1: List<a>) => (l2: List<b>) => List<c>) => l1 => l2 =>
  l1.kind == "empty"? empty() : l2.kind == "empty" ? empty() : full(f(l1.head)(l2.head))(listFunc(f)(l1.tail)(l2.tail))

console.log("\n--- list1 --- ")
console.log(printList(List([20, 34, 56, 12])))
console.log("\n--- list2 --- ")
console.log(printList(List([321, 54, 256, 92, 123])))
console.log("\n--- listFunc (Add elements' values) --- ")
const resList = listFunc<number, number, number>(Fun(x => Fun(y => x + y)))(List([20, 34, 56, 12]))(List([321, 54, 256, 92, 123]))
console.log(printList(resList))

//Exercise 5
//Implement a function that folds two lists of different content and equal length. If the length is different then `None` is returned.

const fold2 = <U, a, b> (f : BasicFunc<U, BasicFunc<a, BasicFunc<b, U>>>) : (init: U) =>
  (l1 : List<a>) => (l2 : List<b>) => Option<U> => 
      init => l1 => l2 => listLength(l1) != listLength(l2) ? none() :
                          l1.kind == "empty" && l2.kind == "empty" ? some(init) :
                          l1.kind == "full" && l1.tail.kind == "empty" &&
                          l2.kind == "full" && l2.tail.kind == "empty" ? some(f(init)(l1.head)(l2.head)) : 
                          l1.kind == "full" && l2.kind == "full" ?
                          fold2(f)(f(init)(l1.head)(l2.head))(l1.tail)(l2.tail) : none()  


const addFuncString : BasicFunc<string, BasicFunc<number, BasicFunc<number, string>>> = s => x => y => s == "" ? s + (x + y) + ", " + y : s + ", " + (x + y) 
console.log("\n--- list1 --- ")
console.log(printList(List([20, 394, 560, 12])))
console.log("\n--- list2 --- ")
console.log(printList(List([270, 344, 856, 612])))
const resListFold = fold2<string, number, number>(addFuncString)("")(List([20, 394, 560, 12]))(List([270, 344, 856, 612]))    
const resListFold1 = fold2<number, number, number>(s => x => y => s + x + y)(0)(List([20, 394, 560, 12]))(List([270, 344, 856, 612])) 
console.log("\n--- fold 2 lists --- ")
console.log("resListFold: " + (resListFold.kind == "None" ? "<NO VALUE>": resListFold.Value))
console.log("\nresListFold1 (sum): " + (resListFold1.kind == "None" ? "<NO VALUE>": resListFold1.Value))

//Exercise 6
// Implement a function
// const zip = <a,b> (l1 : List<a>) : (l2 : List<b>) => Option<List<Pair<a,b>>> => ...
// that take two lists with the same length and creates a list of pairs containing the elements that are in the same position
// from both lists. Implement this function by using normal recursion and then by using the implementation of exercise 5.

const zip = <a,b> (l1 : List<a>) : (l2 : List<b>) => Option<List<Pair<a,b>>> => 
                l2 => listLength(l1) != listLength(l2) ? none() :
                      l1.kind == "empty" && l2.kind == "empty" ? some(empty()) :
                      l1.kind == "full" && l1.tail.kind == "empty" &&
                      l2.kind == "full" && l2.tail.kind == "empty" ? some(full<Pair<a,b>>([l1.head, l2.head])(empty())) : 
                      l1.kind == "full" && l2.kind == "full" ?
                      some(full<Pair<a,b>>([l1.head, l2.head])((zip(l1.tail)(l2.tail) as Something<List<Pair<a,b>>>).Value)) : none()  

const zip2 = <a,b> (l1 : List<a>) : (l2 : List<b>) => Option<List<Pair<a,b>>> => 
        l2 => fold2<List<Pair<a,b>>, a, b>(l => el1 => el2 => append(l)(List([[el1, el2]])) )(empty())(l1)(l2)


const resListZip = zip<number, number>(List([20, 394, 560, 12]))(List([270, 344, 856, 612]))
const resListZip2 = zip2<number, number>(List([20, 394, 560, 12]))(List([270, 344, 856, 612]))


console.log("\n--- list1 --- ")
console.log(printList(List([20, 394, 560, 12])))
console.log("\n--- list2 --- ")
console.log(printList(List([270, 344, 856, 612])))
console.log("\n--- zip --- ")
console.log(resListZip.kind == "None" ? "<NO VALUE>" : printList(resListZip.Value))
console.log("\n--- zip using fold2 (Exercise 5) --- ")
console.log(resListZip2.kind == "None" ? "<NO VALUE>" : printList(resListZip2.Value))




```