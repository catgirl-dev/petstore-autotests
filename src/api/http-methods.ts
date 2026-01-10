import {Headers, Pet} from "./types";

export class HttpMethods {
    // Добавление питомца
    static async postPet(url: string, body: Pet, headers: Headers): Promise<Response> {
        const response: Response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers
        })

        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} ${response.statusText}`)
        }

        return response;
    }

    // Изменение по ID
    static async putPet (url: string, body: Pet, headers: Headers): Promise<Response> {
        const response: Response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: headers
        })

        if (!response.ok) {
            console.error(response.statusText, response.statusText)
        }

        return response;
    }

    // Получение по ID
    static async getPet <T>(url: string, headers: Headers): Promise<Response> {
        const response: Response = await fetch(url, {
            method: "GET",
            headers: headers
        })

        if (!response.ok) {
            console.error(response.statusText, response.statusText)
        }
        return response;
    }

    // Изменение статуса
    static async postPetStatus(url: string, headers: Headers): Promise<Response> {
        const response: Response = await fetch(url, {headers: headers})

        if (!response.ok) {
            console.error(response.statusText, response.statusText)
        }

        return response;
    }

    // Удаление питомца
    static async deletePet (url: string, headers: Headers): Promise<Response> {
        const response: Response = await fetch(url, {headers: headers})

        if (!response.ok) {
            console.error(response.statusText, response.statusText)
        }

        return response;
    }
}