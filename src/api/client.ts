import {Headers, Pet, statusBody} from "./types";
import {HttpMethods} from "./http-methods";


const BASE_URL: string = "https://petstore.swagger.io/v2";
const POST_RESOURCE: string = "/pet";
const GET_RESOURCE: string = "/pet";
const PUT_RESOURCE: string = "/pet";
const DELETE_RESOURCE: string = "/pet";


export class PetStoreAPI {
    static async addPet(petId: number): Promise<Response> {
        const url: string = `${BASE_URL}${POST_RESOURCE}`;
        const body: Pet = {
            "id": petId,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "Mur",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "sold"
        }

        const headers: Headers = {
            accept: "application/json",
            "Content-Type": "application/json",
        }

        const response: Response =  await HttpMethods.postPet(url, body, headers);

        return response
    }

    static async putPet(petId: number): Promise<Response> {
        const url: string = `${BASE_URL}${PUT_RESOURCE}`;
        const body: Pet = {
            "id": petId,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "doggie",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        }
        const headers: Headers = {
            accept: "application/json",
            "Content-Type": "application/json",
        }

        const response: Response = await HttpMethods.putPet(url, body, headers);

        return response
    }

    static async findPetById(petId: number): Promise<Response> {
        const url: string = `${BASE_URL}${GET_RESOURCE}/${petId}`;
        const headers: Headers = {
            accept: "application/json",
        }

        const response = await HttpMethods.getPet(url, headers);

        return response;
    }

    static async changePetStatus(petId: number): Promise<Response> {
        const url: string = `${BASE_URL}${POST_RESOURCE}/${petId}`;
        const headers: Headers = {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        }
        const body: statusBody = {
            status: "available"
        }

        const response: Response = await HttpMethods.postPetStatus(url, headers, body);

        return response;
    }

    static async deletePetById(petId: number): Promise<Response> {
        const url: string = `${BASE_URL}${DELETE_RESOURCE}/${petId}}`;
        const headers: Headers = {
            accept: "application/json",
            "api_key": "special-key",
        }

        const response: Response =  await HttpMethods.deletePet(url, headers);

        return response;
    }
}
