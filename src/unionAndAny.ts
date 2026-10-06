// Unions: These just means we make use of '|' for using multiple values or data types
let counting: string | number = "1 million"
counting = 100000

let status: "pending" | "fulfilled" | "rejected" = "pending"
// status = "new" This will be wrong as we have already specifies 3 values for it.

// Any: This we just use when we actually don't what we will get or don't care about it.
let dataIncoming: any;
dataIncoming = "hello";
dataIncoming = 100;
dataIncoming = { name: "Sam" };
// Typescript will not complain about this as we can change it to any data which is harmful
// but it is required sometimes if we don't know what we will get here