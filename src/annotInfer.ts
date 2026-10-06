let food = "dal chawal"

// food = 0  - This is wrong as TS has inferred that food will be a string

let decision = Math.random() > 0.5 ? 3 : "Pass turn" // Here it infers that both type are possible

// Here both are allowed as we annotated that it can take both string as well as number
let num: number | string = "one"
num = 1

let truth: boolean = false
// truth = "a" - This is wrong as we annotated already and can't be changed