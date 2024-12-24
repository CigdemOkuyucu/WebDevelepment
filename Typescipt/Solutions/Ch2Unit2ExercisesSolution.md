## Summary

**Tuples:** A tuple is an ordered sequence of non-homogeneous values, such as (3,"Hello world!",-45.3f) and can be accesed by its index starting from 0
```ts
const t : [bigint, string, number] = [3n,"Hello world!",-45.3]
```
> Typescript is a bit atypical in this, since usually in functional programming languages the syntax for the arguments used in addUncurried2 is mapped directly to a tuple, thus the type of the input of the function will match the type of a tuple. In typescript you can explicitly pass a tuple or specify a function with multiple arguments, but you cannot interchange them, i.e. you cannot call addUncurried(3, 5), instead you need to use the second implementation for that. Writing addUncurried([3, 5]) is instead a valid call.

**Records** Records are finite map of names into values that can optionally define some members. It must have readonly fields for immutablity and member method should have `this` as argumnent 
```ts
interface R{
  readonly f1 : t1
  readonly f2 : t2
  ...
  readonly fn : tn
  readonly m1: (arg1 : t1, arg2 : t2, ..., argn : tn1) => tr1
  readonly m2: (this : R, arg1 : t1, arg2 : t2, ..., argn : tn2) => tr2
}
```
Records are immutable, so it is not possible to directly update their fields. we must create a new record where all the values of the fields that are left untouched by the update are initialized by reading the corresponding values in the original record, and all the updated fields are initialized with the new value.
```ts
const oldLogin = { 
  userName: "awesomeuser@aw.us", 
  password: "supersecretkey",
  address: "155.34.21.105" 
}
const newLogin = {...oldLogin,
  address: "165.40.69.69"
}
```

# Exercises

## Exercise 1
Model a point in the space as a record `Point2D` containing a field `Position`, which is a tuple of type `[number, number]`. Define two different constructor methods for this point\: the first creates a point given 2 coordinates `x` and `y` taken as input. The second creates a random point whose coordinates are between two parameters `min` and `max` taken as input.

### Solution 1
```ts
type Position = [number, number]
//varoius ways to solve it, Point2D as cPoint2D, iPoint2D or tPoint2D where prefix c, i, and t symbolized class, interface and type.

class cPoint2D{
  //readonly Position:Position;
  readonly Position:[number, number]; // :Position
  constructor(x:number, y:number);
  constructor(min:number, max:number, rand:(min: number, max: number)=> number)
  constructor(xorMin:number, yorMax:number, rand?:(min: number, max: number)=> number){
    if (rand==undefined)
      this.Position=[xorMin,yorMax]
    else
      this.Position=[randomNumber(xorMin, yorMax),randomNumber(xorMin, yorMax)]
  }
}
//OR
type tPoint2D = {
  readonly Position:[number, number];
}
//OR
interface iPoint2D{
  readonly Position:[number, number];
}

const createPoint2DXY = (x:number, y:number) : tPoint2D|iPoint2D => ({
  Position:[x,y]
})

const createPoint2DRandom = (min:number, max:number) : tPoint2D|iPoint2D => ({
  Position:[randomInt(min) (max),randomNumber(min, max)]
})

const randomNumber = (min: number, max: number): number => Math.round(Math.random() * (max - min) + min)
//OR another version for random number
const randomInt = (min:number)=>(max:number):number => Math.round(Math.random() * (max - min) + min)
```

## Exercise 2
Extend `Point2D` with two properties to read the first and second coordinate, and a method to compute the distance between two points. Given a point $(x_1,y_1)$ and $(x_2,y_2)$, their distance is given by  $\sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}$. You can use the `sqrt` function to compute the square root of a number.

### Solution 2
```ts
type tPoint2DExt = tPoint2D & {
  get first() : (this:tPoint2DExt)=>number 
  get second (): (this:tPoint2DExt)=>number
  readonly distance : (this: tPoint2DExt, P2: tPoint2DExt)=>number
}

//OR : use type of interface whichever you prefer.

interface iPoint2DExt extends iPoint2D{
  get first() : (this:iPoint2DExt)=>number 
  get second() : (this:iPoint2DExt)=>number
  readonly distance : (this: iPoint2DExt, P2: iPoint2DExt)=>number
}

//Extra, not explicitly required but good to know
type Point2D = tPoint2D | iPoint2D
type Point2DExt = tPoint2DExt | iPoint2DExt
//End

const createPoint2DExt = (x:number, y:number) : Point2DExt => ({
  Position:[x,y],
  first : function(this:Point2DExt){
    return this.Position[0]
  },
  second : function(this:Point2DExt){
    return this.Position[1]
  },
  distance : function (this:Point2D, P2:Point2D){
   return Math.sqrt(
    Math.pow(this.Position[0]-P2.Position[0], 2) 
    + 
    Math.pow(this.Position[1]-P2.Position[1], 2)
  );
}

})

//Extra: function overloading
function CreatePoint2DExtend(x:number, y:number):Point2DExt
function CreatePoint2DExtend(P:Point2D):Point2DExt
function CreatePoint2DExtend(Pox:Point2D|number, y?:number):Point2DExt{
  return {
    Position: typeof Pox !="number"? Pox.Position: [Pox,y as unknown as number],
    
    first : function(this:Point2DExt){
      return this.Position[0]
    },
    second : function(this:Point2DExt){
      return this.Position[1]
    },

    distance : function (this:Point2D, P2:Point2D){
    return Math.sqrt(
      Math.pow(this.Position[0]-P2.Position[0], 2) 
      + 
      Math.pow(this.Position[1]-P2.Position[1], 2)
    ); 
    }
  }
}
//End overload



//Another way to calculate the distance
const Distance = (P1:Point2D, P2:Point2D):number =>
   Math.sqrt(
    Math.pow(P1.Position[0]-P2.Position[0], 2) 
    + 
    Math.pow(P1.Position[1]-P2.Position[1], 2)
  );

```

## Exercise 3

A `Blob` is defined by a `Position` of type `Point2D` and a `Size/Speed` of type `int`. Each `Blob` randomly roams around a 100x100 area. This means that the minimum x coordinate of `Position` can be -50.0 and the maximum 50.0. The same applies for the y coordinate. Represent a `Blob` as a record with a constructor that takes no arguments and sets the position to a random `Point2D` and the speed to a random value between 1 and 5.

### Solution 3
```ts
type Blob0 = {Position:[number, number], Speed:number}
//OR
type Blob1 = Point2D & {Speed:number}
//OR
interface Blob2 extends iPoint2D{
   Speed:number 
}
//OR
interface Blob3{
  readonly Position:[number, number],
  Speed:number
}
//Optional
type AllBlobs = Blob0|Blob1|Blob2|Blob3
//Must
const CreateBlob = ():AllBlobs=>({
   Position:[randomInt(-50)(50), randomNumber(-50,50)],
   Speed:randomInt(1)(5) })

```

## Exercise 4

Extend the `Blob` record by adding a method `Move` that takes no arguments and randomly moves the `Blob`. A `Blob` randomly choose whether to go up, down, left, or right, thus you can generate a random number between 0 and 3 to decide what to do and change the position accordingly. The movement must not take the `Blob` outside the 100x100 area, thus if either the x or the y coordinates are outside the interval `[-50,50]` they are reset to the lower bound or the upper bound, depending on where the overflow occurs (if you get past 50 you go back to 50, and if you go below -50 you go back to -50).

### Solution 4
```ts
interface MoveableBlob extends Blob3{
  Move:(this:MoveableBlob)=>MoveableBlob;
}

const limit = (min:number=-50, max:number=50)=>(value:number):number=> value>max? max: value<min? min: value;

const CreateMoveableBlob= ():MoveableBlob =>{
  return {
    Speed: randomInt(1)(5),
    Position:[randomNumber(-50,50),randomNumber(-50,50)],
    Move: function (this:MoveableBlob):MoveableBlob {
      //const dir = ['up','down', 'left', 'right']
      const dir = [
        ():Position=> [this.Position[0], limit()(this.Position[1]+this.Speed)],
        ():Position=> [this.Position[0], limit()(this.Position[1]-this.Speed)],
        ():Position=> [limit()(this.Position[0]-this.Speed), this.Position[1]],
        ():Position=> [limit()(this.Position[0]+this.Speed), this.Position[1]],
      ]
      const rand:number = randomInt(0)(3)
      return{
        ...this,
        Position: dir[rand]()
      }
    }//end move
  }
}//end CreateMoveableBlob
```

## Exercise 5

Create a record `World` that contains two blobs and a field `Tick`. `World` contains a constructor, which takes a number of ticks and creates two blobs, and a method `Run` that takes no parameters and move the blobs around for as many ticks as specified by `World`.

### Solution 5
```ts
interface World{
  readonly b1: MoveableBlob,
  readonly b2: MoveableBlob,
  readonly Tick: number,
  Run: (this:World)=>void
}

const CreateWorld = (t:number):World => ({
  b1 : CreateMoveableBlob(),
  b2 : CreateMoveableBlob(),
  Tick:t,
  Run: function(this:World):void{
    console.log(this) // for bookkeeping only
      this.Tick>0? {
        ...this,
        Tick: this.Tick-1,
        b1: this.b1.Move(),
        b2: this.b2.Move(),
      }.Run():this
  }
});

```
