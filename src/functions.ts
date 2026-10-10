// Declaring types on the go

function createOrder(id: number, name: string, quantity: number) {
    return {
        id,
        name,
        quantity
    }
}

// Declaring types then using them

type FoodOrder = {
    id: Number,
    name: string,
    quantity: number
}

function createNewOrder(order: FoodOrder) {
    return {
        id: order.id,
        name: order.name,
        quantity: order.quantity
    }
}

// Using return types

function printHello(): void {
    console.log("Hello")
}

function addNum(a: number, b: number): number {
    return a + b
}

