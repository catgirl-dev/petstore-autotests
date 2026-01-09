import {Headers, Pet} from "./types";

export class HttpMethods {
    // Добавление питомца
    static async postPet <T>(url: string, body: Pet, headers: Headers): Promise<T> {
        const response: Response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers
        })

        if (!response.ok) {
            console.error(response.statusText, response.statusText)
        }

        return await response.json() as Promise<T>;
    }

    // Изменение по ID
    static async putPet <T>(url: string, body: Pet, headers: Headers): Promise<T> {
        const response: Response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: headers
        })

        if (!response.ok) {
            console.error(response.statusText, response.statusText)
        }

        return await response.json() as Promise<T>;
    }

    // Получение по ID
    static async getPet <T>(url: string, headers: Headers): Promise<T> {
        const response: Response = await fetch(url, {
            method: "GET",
            headers: headers
        })

        if (!response.ok) {
            console.error(response.statusText, response.statusText)
        }
        return await response.json() as Promise<T>;
    }

    // Изменение статуса
    static async postPetStatus<T>(url: string, headers: Headers): Promise<T> {
        const response: Response = await fetch(url, {headers: headers})

        if (!response.ok) {
            console.error(response.statusText, response.statusText)
        }

        return await response.json() as Promise<T>;
    }
}