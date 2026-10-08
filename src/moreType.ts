// Type assertion is a technique to make sure the types is treated as intended

// Forceful Type assertion
let request: any = "42"

// This way we don't get any suggestions 
let numeric: number = request.length

// So we do it forcefully
numeric = (request as string).length


// Another example: Suppose data comes in for books
type Book = {
    name: string
}

const bookData = '{"name": "Half Girlfriend"}'
// We parse the data
const bookObject = JSON.parse(bookData) as Book

// We won't get suggestion without `as` keyword with the type
console.log(bookObject.name)

// For DOM element assertion we have types available in TS
const inputElement = document.getElementById("username") as HTMLInputElement

// Type never: It helps us catch edge cases or if we don't want to return anything

// Example: If we have a Role type in production

type Role = "admin" | "user"

function redirectOnRole(role: Role): void {
    if (role === "admin") {
        console.log("Admin Dashboard")
        return
    }

    if (role === "user") {
        console.log("User Dashboard")
        return
    }

    // Here we can use this to check if there any other roles for which we need to check like 
    // as per now never means there are no more roles available
    role;
}