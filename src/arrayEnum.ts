const ages: number[] = [21, 22, 23, 20]
const names: string[] = ["James", "Milly", "Mikey"]

const rating: Array<number> = [2.5, 4.5, 3.5]

// custom type array 
type Order = {
    name: string;
    quantity: number;
}

const orders: Order[] = [
    { name: "Chinese", quantity: 2 },
    { name: "Italian", quantity: 1 }
]

// readonly array
const dhabaOrder: readonly Order[] = [
    { name: "Chinese", quantity: 2 },
    { name: "Italian", quantity: 1 }
]

// dhabaOrder.push({ name: "Italian", quantity: 1 })
// This is not allowed as we have created readonly array 

// We can also create 2-D arrays
const twoDArr: number[][] = []

// We can create tuples here
let tuple: [number, string, boolean?]
tuple = [10, "Jshf"]
tuple = [20, "Klmnp", true]

// We can also create readonly tuples
let newTuple: readonly [number, string] = [2, ""]

// Named tuples are commonly used so that we know which variable needs to be used
let newArr: [name: string, num: number]
newArr = ["Ab", 1]

// Enums: Are limited choices that are given.
// We should make sure that enums are of same type
// If we have numbers they become incrementing values if not assigned
const enum Status {
    Pending = "pending",
    Active = "active",
    Done = "done",
    Failed = "failed"
}

const orderStatus = Status.Pending

// We can also use enums in functions to allow limited choices

// Warning: Tuples are array at the end so if they aren't readonly then we can push values in them