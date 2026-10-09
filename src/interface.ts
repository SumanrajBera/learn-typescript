// Interface: It is basically a contract with classes that a class must fulfill
// Specifically when we want custom types

type FoodOrder = {
    id: Number,
    item: string
}
// This doesn't work because its not an object rather a literal type
// type OrderStatus = "received" | "cooking" | "served"

interface OrderStatus {
    status: "received" | "cooking" | "served"
}

class Order implements FoodOrder, OrderStatus {
    // Here the FoodOrder as type is fine but should be an interface
    id = 12940
    item = "Chinese"

    // But the OrderStatus as type isn't valid.
    // So we need to make the OrderStatus into an interface
    status: "received" | "cooking" | "served" = "received"
}

// This will also not work if we implement in classes
type Response = { ok: "send" } | { ok: "don't send" }


// Intersecting two types using `&`
type responseBody = {
    body: string
}

type responseStatus = {
    status: "success" | "error";
};

// Now this type will have the qualities of both
type NewResponse = responseBody & responseStatus

function createResponse(obj: NewResponse) {
    console.log(obj.body);
    console.log(obj.status);
}

// readonly: Will set only once but can never be set again

type Config = {
    readonly id: number,
    appName: string,
    version: number,
    description?: string
}

const newConfig: Config = {
    id: 123455,
    appName: "New App",
    version: 1,
}

// We can change appName and version but can't change id as its `readonly`
// Also the description uses ? which means can be there or not but if its available needs to be string