// Generics: We can define a common Type which means it can accept any Type

function displayContent<T>(content: T): void {
    console.log(content)
}

// Its a universal acceptor
displayContent(1)
displayContent("String")
displayContent(true)

// We can also do multiple 

function returnArr<A, B>(a: A, b: B): [A, B] {
    // return [b, a] This will be wrong as we have defined the order in which the types need to be returned
    return [a, b]
}

// We can use this in API response to handle the unknow that comes