# Typescript

TypeScript adds static type checking to JavaScript, allowing us to catch type-related errors during development rather than relying entirely on JavaScript's runtime behavior.

TypeScript = JavaScript + a compile-time type system + tools for expressing and checking the structure of your program.

## How TS works?
![Typescript working](./ss/image.png)

## Type Annotations and Inference
- Annotation: I will explain (Explicitly mentioning what we will use to TS)
- Inference: You understand on your own (TS knows what type is used here based on value)

## Unions and `any`

### Union Types

A **union type** allows a variable to have multiple possible types.

We use the `|` operator to create a union.

```ts
let counting: string | number = "1 million";

counting = 100000;
```

Here, `counting` can contain either a `string` or a `number`.

```ts
counting = "1 million"; // Valid
counting = 100000;     // Valid
counting = true;       // Error
```

`boolean` is not part of the union, so TypeScript gives us an error.

---

### Literal Unions

A union can also specify the **exact values** that are allowed.

```ts
let status: "pending" | "fulfilled" | "rejected" = "pending";
```

Now `status` can only contain one of these three values:

```ts
status = "pending";
status = "fulfilled";
status = "rejected";
```

This is invalid:

```ts
status = "new"; // Error
```

because `"new"` was not included in the union.

This is useful when a variable has a fixed set of possible states.

---

### `any`

`any` is used when we **don't know what type of data we will receive or don't care about the type**.

```ts
let dataIncoming: any;
```

Now the variable can contain different types of data:

```ts
dataIncoming = "hello";
dataIncoming = 100;
dataIncoming = true;
dataIncoming = { name: "Sam" };
```

TypeScript will not complain about these assignments.

We can also access properties or call methods without TypeScript checking whether they actually exist:

```ts
let dataIncoming: any = "hello";

dataIncoming.toUpperCase();
dataIncoming.someFunction();
```

The second operation could fail at runtime, but TypeScript won't give us a type error because we told it that the value is `any`.

#### When can `any` be useful?

For example, when receiving data from an external source where we don't know the structure beforehand:

```ts
let dataIncoming: any;
```

We can then work with whatever data we receive without TypeScript forcing us to define its structure first.

## Type unknown and narrowing

### `unknown`

`unknown` is a safer alternative to any when we don't know the type of a value yet.

The key difference is:

`any` → TypeScript allows us to do almost anything with the value.
`unknown` → TypeScript forces us to determine/narrow the type before using it.
let value: unknown = "Hello";

We cannot directly perform operations on value:

value.toUpperCase(); // ❌ Error

We first need to determine its type:

if (typeof value === "string") {
    value.toUpperCase(); // ✅
}

#### Mental Model
`unknown` = "I don't know the type yet. Prove what it is before using it."

This makes `unknown` particularly useful for external/untrusted data, such as API responses, user input, or parsed JSON.

### Type narrowing
`Type narrowing` means reducing a broad type into a more specific type by checking some condition.

For example:

```ts
function getNum(kind: string | number) {
    if (typeof kind === "string") {
        return "Number can only be read";
    }

    return "Number can be used to perform operations";
}
```

Initially:

```ts
kind: string | number
```

TypeScript doesn't know whether kind is a string or a number.

After:

```ts
typeof kind === "string"
```

TypeScript knows that inside the if block:

```ts
kind: string
```

Therefore, after the if block, TypeScript knows that kind must be:
```ts
kind: number
```
Common narrowing techniques
- typeof

Used mainly for primitive types:
```ts
if (typeof value === "string") {
    // value is string
}

if (typeof value === "number") {
    // value is number
}
```
- Truthiness check
```ts
function getAddress(addr?: string) {
    if (addr) {
        return "Save Address";
    }

    return "No address is saved";
}
```

Here:

```ts
addr?: string
```

means:

```ts
addr: string | undefined
```

The condition:

```ts
if (addr)
```

narrows addr to a usable string inside the block.

#### Mental Model
`Narrowing` = "I have a broad type; this condition gives TypeScript enough information to make it more specific."

## Creating Custom Types

We can create our own types using the type keyword.

```ts
type Food = {
    orderID: string,
    orderName: string,
    quantity: number
}
```

Now Food represents the structure an object must follow.

```ts
const order: Food = {
    orderID: "ORD001",
    orderName: "Pizza",
    quantity: 2
};
```

TypeScript will check that the object contains the expected properties with the correct types.

For example:

```ts
const order: Food = {
    orderID: "ORD001",
    orderName: "Pizza",
    quantity: "2" // ❌ Error
};
```

quantity is expected to be a number, but "2" is a string.

### Why Create Custom Types?

`Custom types` are especially useful when working with structured data, such as API responses.

Suppose an API returns:

```json
{
    "orderID": "ORD001",
    "orderName": "Pizza",
    "quantity": 2
}
```

We can describe the expected structure:

```ts
type Food = {
    orderID: string,
    orderName: string,
    quantity: number
}
```

Then use that type throughout our application:

```ts
function processOrder(order: Food) {
    console.log(order.orderName);
    console.log(order.quantity);
}
```

This gives us:
- Autocomplete
- Compile-time checking
- Clear documentation of the data structure
- Fewer mistakes when accessing properties

### Mental Model

`type` = "Define the shape that a value/object should have."

## Type Assertions

Type assertion is a technique used to tell TypeScript **how we want a value to be treated by the type system**.

It does **not** convert or change the actual value at runtime.

### 1. Forceful Type Assertion

Sometimes TypeScript does not know the type we intend to work with. We can use the `as` keyword to tell TypeScript to treat a value as a specific type.

```ts
let request: any = "42";

// TypeScript cannot provide useful type information
// because request is `any`.
let numeric: number = request.length;

// Tell TypeScript to treat request as a string
numeric = (request as string).length;
```

Here:

```ts
request as string
```

means:

> "TypeScript, treat `request` as a `string` from this point in this expression."

Since strings have a `length` property, TypeScript can provide the appropriate type information.

#### Important

Type assertion does **not** perform runtime validation or conversion.

```ts
const value = 42 as unknown as string;
```

This does not turn the number `42` into a string. The runtime value is still a number.

So type assertion should be used when **we already have sufficient knowledge about the value's type**, but TypeScript cannot infer it correctly.

---

### Type Assertion with API / JSON Data

A common situation is receiving data from an external source.

```ts
type Book = {
    name: string;
};

const bookData = '{"name": "Half Girlfriend"}';

const bookObject = JSON.parse(bookData) as Book;

console.log(bookObject.name);
```

`JSON.parse()` returns `any`, so TypeScript does not know the structure of the parsed object.

By writing:

```ts
JSON.parse(bookData) as Book
```

we tell TypeScript:

> "Treat the parsed value as a `Book`."

Now TypeScript knows that `bookObject` has:

```ts
name: string
```

#### Important

This still does **not validate** that the JSON actually contains a valid `Book`.

For example:

```ts
const bookObject = JSON.parse('{"title": "Half Girlfriend"}') as Book;
```

TypeScript will accept the assertion, even though the runtime object does not contain the required `name` property.

For data coming from untrusted sources such as APIs, validation libraries such as Zod can be used when runtime validation is required.

---

### DOM Type Assertion

TypeScript also provides specific types for DOM elements.

```ts
const inputElement =
    document.getElementById("username") as HTMLInputElement;
```

`getElementById()` returns:

```ts
HTMLElement | null
```

TypeScript does not automatically know that the element with the `"username"` ID is specifically an input element.

We can assert:

```ts
as HTMLInputElement
```

Now TypeScript knows that we intend to use it as an `HTMLInputElement`.

For example:

```ts
inputElement.value;
```

TypeScript can provide the properties and methods available on `HTMLInputElement`.

Again, this does not check the DOM element at runtime. If the element is actually a different type, the assertion does not magically change it.

---

## The `never` Type

`never` represents a situation where **a value can never exist**.

One common use is **exhaustive checking of union types**.

Consider:

```ts
type Role = "admin" | "user";
```

There are currently only two possible values:

```text
"admin"
"user"
```

We can handle both:

```ts
function redirectOnRole(role: Role): void {
    if (role === "admin") {
        console.log("Admin Dashboard");
        return;
    }

    if (role === "user") {
        console.log("User Dashboard");
        return;
    }

    role;
}
```

After the two checks, TypeScript knows that there are no remaining possible values for `role`.

Therefore, in the final section:

```ts
role;
```

the type of `role` is:

```ts
never
```

The important idea is:

```text
Role
 ↓
"admin" | "user"
 ↓
remove "admin"
 ↓
"user"
 ↓
remove "user"
 ↓
never
```

So `never` can help us detect whether we have handled **every possible case**.

---

### Exhaustive Checking with `never`

A common pattern is to create a function that accepts only `never`:

```ts
function assertNever(value: never): void {
    console.log("All roles are checked")
}
```

Then:

```ts
type Role = "admin" | "user";

function redirectOnRole(role: Role): void {
    if (role === "admin") {
        console.log("Admin Dashboard");
        return;
    }

    if (role === "user") {
        console.log("User Dashboard");
        return;
    }

    assertNever(role);
}
```

Because `assertNever()` only accepts `never`, TypeScript verifies that all possible `Role` values have been handled.

This becomes especially useful when the union changes:

```ts
type Role = "admin" | "user" | "moderator";
```

Now `"moderator"` has not been handled.

Therefore, at:

```ts
assertNever(role);
```

TypeScript will produce an error because `role` is still:

```ts
"moderator"
```

rather than:

```ts
never
```

This alerts us that we need to add handling for the new role.

