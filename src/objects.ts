// Objects: When we are creating objects we must create types for them and then use it.

let food: {
    name: string;
    quantity: number
}

// We have defined its type first then assigned them
food = {
    name: "Dosa",
    quantity: 2
}

// We can make use of types

type FoodOrder = {
    id: number
    name: string
    quantity: number
}

const newOrder: FoodOrder = {
    id: 1233,
    name: "Chinese",
    quantity: 1
}

// We can also use other types inside another type

type Transaction = {
    id: number,
    date: Date
}

type Address = {
    floor: number,
    addressLine1: string,
    addressLine2?: string
}

type Account = {
    username: string,
    transactions: Transaction[], // For multiple transactions
    address: Address
}

// Structural typing
type Cup = {
    size: "small" | "medium" | "large"
}

let mediumCup = {
    size: "medium" as const, // Treated as a literal type so that TS doesn't think it can be changed to something else
    material: "steel",
    price: 500
}

let smallCup: Cup = mediumCup // Allowed as sometimes we may receive extra data. 
// We don't want it to interfere with the type we are already using. TS will only allow us to access the size as we have defined it.

console.log(smallCup.size)

// Partial: Makes all the properties optional

type PropertyLand = {
    plotNo: number,
    address: string
}

function updateProperty(updates: Partial<PropertyLand>) {
    console.log("All the updates")
}

updateProperty({ address: "Jadunagar Delhi" })
updateProperty({}) // This can happen so we need to be careful because this means no update

// Required: Makes all the properties required even if any property was optional using ?

function updateByBuilder(updates: Required<PropertyLand>) {
    console.log("All new updates:", updates)
}

updateByBuilder({
    plotNo: 5,
    address: "Ultinagar, Chouras Baug"
})// This helps us make sure the data is complete

// Pick: This allows us to pick the properties that we want.

type User = {
    name: string,
    email: string,
    password: string
}

type UpdateUser = Pick<User, "name" | "email">

const data: UpdateUser = {
    name: "Hello",
    email: "ace@gmsil.com"
} // We picked two for the current interface and used them. And if we want to make them optional such as either email or name or both then we can use Partial (Partial<Pick<User, "name"| "email">>)


// Omit: This can be used to omit a property 

type GeneralUpdate = Partial<Omit<User, "password">> // Here we have omitted password so that it doesn't change generally