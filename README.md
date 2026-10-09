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

## Interfaces, Intersections, and Property Modifiers

### Interfaces

An `interface` defines a contract that describes the properties and methods an object should have. When a class implements an interface, it must satisfy that contract.

Interfaces are commonly used to define contracts for classes.

```ts
interface OrderStatus {
    status: "received" | "cooking" | "served";
}
```

Here, `OrderStatus` requires an object to have a `status` property whose value must be one of the three specified strings.

#### Using interfaces with classes

```ts
type FoodOrder = {
    id: number;
    item: string;
};

interface OrderStatus {
    status: "received" | "cooking" | "served";
}

class Order implements FoodOrder, OrderStatus {
    id = 12940;
    item = "Chinese";
    status: "received" | "cooking" | "served" = "received";
}
```

* `implements` checks whether the class satisfies the specified type contracts.
* A class can implement multiple interfaces or object-shaped type aliases.
* Using an `interface` for a class contract is a common convention, but it is not mandatory.
* Use the primitive type `number` rather than the wrapper type `Number`.

#### Why can't a class implement a union of object types?

```ts
type Response =
    | { ok: "send" }
    | { ok: "don't send" };
```

This is a union type. It describes two alternative object shapes.

A class cannot directly implement this union:

```ts
// Invalid
class MyResponse implements Response {}
```

Instead, use the union as a type for a value or property, or define an interface if the class needs a contract.

```ts
interface Response {
    ok: "send" | "don't send";
}

class MyResponse implements Response {
    ok: "send" | "don't send" = "send";
}
```

**Remember:** `implements` checks whether a class instance satisfies a type's structure. It does not require that structure to be declared using `interface`, but a union type cannot be implemented directly.

---

### Intersection Types (`&`)

An intersection combines multiple type requirements. A value must satisfy all the combined types.

```ts
type ResponseBody = {
    body: string;
};

type ResponseStatus = {
    status: "success" | "error";
};

type NewResponse = ResponseBody & ResponseStatus;
```

`NewResponse` requires both the `body` and `status` properties.

```ts
function createResponse(obj: NewResponse) {
    console.log(obj.body);
    console.log(obj.status);
}

createResponse({
    body: "Order created",
    status: "success"
});
```

#### Why use intersections?

Intersections are useful when existing types need to be combined into a new type without repeating their properties.

For example, `ResponseBody` and `ResponseStatus` can be defined independently and then combined into `NewResponse`.

**Remember:**

* `|` means OR: one of the alternatives.
* `&` means AND: all the type requirements must be satisfied.

---

### Property Modifiers: `readonly` and Optional Properties (`?`)

Property modifiers change how a property can be used.

#### The `readonly` modifier

The `readonly` modifier prevents a property from being reassigned after initialization.

```ts
type Config = {
    readonly id: number;
    appName: string;
    version: number;
    description?: string;
};

const newConfig: Config = {
    id: 123455,
    appName: "New App",
    version: 1
};
```

The following assignments are allowed:

```ts
newConfig.appName = "Updated App";
newConfig.version = 2;
```

But this assignment produces a TypeScript error:

```ts
newConfig.id = 999; // Error: id is readonly
```

**Important:** `readonly` prevents reassignment through the TypeScript type system. It does not make an object deeply immutable at runtime.

#### Optional properties (`?`)

The `?` modifier makes a property optional.

```ts
type Config = {
    appName: string;
    description?: string;
};
```

Both objects are valid:

```ts
const config1: Config = {
    appName: "New App"
};

const config2: Config = {
    appName: "New App",
    description: "An application"
};
```

If `description` is provided, it must be a string.

When reading an optional property, its value may be `undefined`:

```ts
console.log(config1.description); // undefined
```

## Objects and Utility Types

### Objects and Type Annotations

When creating objects, we can define the shape of the object using a type annotation. This specifies the properties and the types of values they can contain.

```ts
let food: {
    name: string;
    quantity: number;
};

food = {
    name: "Dosa",
    quantity: 2
};
```

Here, `food` must contain a `name` of type `string` and a `quantity` of type `number`.

Defining the object type separately makes it easier to reuse the same structure.

### Type Aliases

A **type alias** allows us to give a name to a type so that we can reuse it throughout our application.

```ts
type FoodOrder = {
    id: number;
    name: string;
    quantity: number;
};

const newOrder: FoodOrder = {
    id: 1233,
    name: "Chinese",
    quantity: 1
};
```

Instead of repeatedly writing the object's structure, we can use `FoodOrder` wherever that type is needed.

### Nested Objects and Arrays

We can use one type inside another type. This helps us represent more complex data structures.

```ts
type Transaction = {
    id: number;
    date: Date;
};

type Address = {
    floor: number;
    addressLine1: string;
    addressLine2?: string;
};

type Account = {
    username: string;
    transactions: Transaction[];
    address: Address;
};
```

#### Important points

* `Transaction[]` represents an array of transactions.
* `address: Address` means the address property must follow the `Address` structure.
* `addressLine2?: string` makes `addressLine2` optional.
* `date: Date` expects a JavaScript `Date` object, not an arbitrary date string.

The `?` modifier allows a property to be omitted.

### Structural Typing

TypeScript primarily uses **structural typing**. An object can be assigned to a type when it contains the required properties with compatible types, even if it has additional properties.

```ts
type Cup = {
    size: "small" | "medium" | "large";
};

let mediumCup = {
    size: "medium" as const,
    material: "steel",
    price: 500
};

let smallCup: Cup = mediumCup;

console.log(smallCup.size); // "medium"
```

The assignment is valid because `mediumCup.size` has the literal type `"medium"`, which is allowed by `Cup`.

The additional properties, `material` and `price`, do not prevent the assignment.

#### Why use `as const` here?

Without `as const`, TypeScript generally infers the mutable object's `size` property as `string`. That is too broad for `Cup`, which accepts only three specific string literals.

```ts
size: "medium" as const
```

This preserves the literal type `"medium"` for that property.

#### Important distinction

After the assignment:

* Both variables reference the same object.
* The object still contains `size`, `material`, and `price`.
* TypeScript still treats `smallCup` as type `Cup`.
* Accessing `smallCup.material` produces a type error because `material` is not declared in `Cup`.

Structural typing is useful when we only need specific properties from an object that may contain additional data.

However, TypeScript does not validate external data at runtime. Use runtime validation when data comes from an API or another untrusted source.

### `Partial<T>`

`Partial<T>` makes every property in a type optional.

```ts
type PropertyLand = {
    plotNo: number;
    address: string;
};

function updateProperty(updates: Partial<PropertyLand>) {
    console.log("All the updates", updates);
}

updateProperty({ address: "Jadunagar Delhi" });
updateProperty({ plotNo: 5 });
updateProperty({});
```

The resulting type is equivalent to:

```ts
type PropertyUpdate = {
    plotNo?: number;
    address?: string;
};
```

#### Why is this useful?

When updating a record, we might want to change only one property instead of supplying every property.

For example, a user might update only their address without changing their plot number.

#### Important consideration

An empty object `{}` is valid because all properties are optional. However, it might represent an update request that changes nothing.

If at least one update is required, validate that condition at runtime.

```ts
function updateProperty(updates: Partial<PropertyLand>) {
    if (Object.keys(updates).length === 0) {
        throw new Error("At least one update is required");
    }

    console.log("All the updates", updates);
}
```

### `Required<T>`

`Required<T>` makes every property required, even if the original type marked some properties as optional.

```ts
type PropertyDraft = {
    plotNo?: number;
    address?: string;
};

function updateByBuilder(updates: Required<PropertyDraft>) {
    console.log("All new updates:", updates);
}

updateByBuilder({
    plotNo: 5,
    address: "Ultinagar, Chouras Baug"
});
```

The resulting type is equivalent to:

```ts
type CompleteProperty = {
    plotNo: number;
    address: string;
};
```

If either property is missing, TypeScript reports an error.

#### Important distinction

Your original `PropertyLand` type already required both properties. Applying `Required<PropertyLand>` would not change that type.

`Required<T>` is most useful when the original type contains optional properties.

### `Pick<T, K>`

`Pick<T, K>` selects specific properties from an existing type.

```ts
type User = {
    name: string;
    email: string;
    password: string;
};

type UpdateUser = Pick<User, "name" | "email">;

const data: UpdateUser = {
    name: "Hello",
    email: "ace@gmail.com"
};
```

`UpdateUser` contains only `name` and `email`.

Both properties remain required because `Pick` preserves their original optional or required status.

#### Making the selected properties optional

If we want to update either the name, the email, or both, we can combine `Pick` with `Partial`.

```ts
type UpdateUser = Partial<Pick<User, "name" | "email">>;
```

This is equivalent to:

```ts
type UpdateUser = {
    name?: string;
    email?: string;
};
```

The order matters conceptually:

1. `Pick` selects which properties are allowed.
2. `Partial` makes those selected properties optional.

This is useful when creating separate input types for user creation and profile updates.

### `Omit<T, K>`

`Omit<T, K>` creates a type by excluding specified properties from an existing type.

```ts
type GeneralUpdate = Partial<Omit<User, "password">>;
```

First, `Omit<User, "password">` removes the `password` property.

The resulting type is:

```ts
type GeneralUpdate = {
    name: string;
    email: string;
};
```

Then, `Partial` makes both remaining properties optional:

```ts
type GeneralUpdate = {
    name?: string;
    email?: string;
};
```

Now the general update type permits changing the name, the email, or both, without including a password field.

This is useful when designing separate types for different operations.

**Security note:** TypeScript types alone do not prevent a client from sending extra fields at runtime. API handlers must validate incoming data and explicitly control which fields can be changed.

### Quick Reference

| Utility type  | Purpose                       |
| ------------- | ----------------------------- |
| `Partial<T>`  | Makes all properties optional |
| `Required<T>` | Makes all properties required |
| `Pick<T, K>`  | Selects specified properties  |
| `Omit<T, K>`  | Excludes specified properties |