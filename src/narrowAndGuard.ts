// Unknown Type: It's relatively safer than any as but we later detemine what type it will handle.

// Type narrowing
function getNum(kind: string | number) {
    if (typeof kind === 'string') {
        return "Number can only be read"
    }

    return "Number can be used to perform operations"
}

function getAddress(addr?: string) {
    if (addr) {
        return "Save Address"
    }

    return "No address is saved"
}

// Creating Types (Type definition) - To handle API's response
type FoodOrder = {
    orderID: string,
    orderName: string,
    quantity: number
}

// Type predicate:
// Tells TypeScript that if this function returns true,
// the object can be treated as a FoodOrder.

function isFoodOrder(obj: unknown): obj is FoodOrder {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "orderID" in obj &&
        typeof obj.orderID === "string" &&
        "orderName" in obj &&
        typeof obj.orderName === "string" &&
        "quantity" in obj &&
        typeof obj.quantity === "number"
    );
}