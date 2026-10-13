// Interface are very similar to types.
// It can be used to make sure whatever is extending or implementing it follows the contract

interface FoodOrder {
    name: string
    quantity: number
    serveFood(): void
}

const newOrder: FoodOrder = {
    name: "Italian",
    quantity: 2,
    serveFood() {
        console.log("Food is served")
    },
}

// We can make index-signature

interface MenuInfo {
    [name: string]: number
}

const menu: MenuInfo = {
    chinese: 245789,
    // chinese: 245789, This will show error as we are expecting unique keys
    italian: 597893
}

console.log(menu.chinese)

// Similar interfaces gets combined automatically

interface User {
    name: string
}

interface User {
    age: number
}

const newUser: User = {
    name: "Samuel",
    age: 22
}

// Next we can reuse different interface into another with `extends`

interface A {
    a: string
}

interface B {
    b: string
}

interface C extends A, B {
    c: string
}

const newLetter: C  = {
    a: "",
    b: "",
    c: ""
}