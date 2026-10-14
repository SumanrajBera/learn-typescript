import axios from 'axios'
import type { AxiosResponse } from 'axios'

// To implement a type
type User = {
    name: string
    username: string
    email: string
}

// Type narrowing for runtime checking
function isUser(data: unknown): data is User {
    if (
        typeof data == "object" &&
        data !== null &&
        "name" in data &&
        typeof data.name === "string" &&
        data.name.trim() !== "" &&

        "username" in data &&
        typeof data.username === "string" &&
        data.username.trim() !== "" &&

        "email" in data &&
        typeof data.email === "string" &&
        data.email.trim() !== ""
    ) return true

    return false
}

const fetchData = async () => {
    try {
        const response: AxiosResponse<unknown> = await axios.get("https://jsonplaceholder.typicode.com/posts/2")

        if (isUser(response.data)) {
            console.log("Name:", response.data.name)
            console.log("Username:", response.data.username)
            console.log("Email:", response.data.email)
        } else {
            throw new Error("The values from the data received doesn't match")
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log("Axios Error:", error.message);
        } else if (error instanceof Error) {
            console.log("Error occurred:", error.message);
        } else {
            console.log("Unknown error:", error);
        }
    }
}

fetchData()