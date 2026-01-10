import {Headers, Pet, statusBody} from "./types";
import {HttpMethods} from "./http-methods";


const BASE_URL: string = "https://petstore.swagger.io/v2";
const POST_RESOURCE: string = "/pet";
const GET_RESOURCE: string = "/pet/findByStatus";
const PUT_RESOURCE: string = "/pet";
const DELETE_RESOURCE: string = "/pet/";


export class PetStoreAPI {
    static async addPet(response: Response): Promise<Response> {
        const url: string = `${BASE_URL}${POST_RESOURCE}`;
        const body: Pet = {
            "id": 110,
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
            "status": "available"
        }

        const headers: Headers = {
            accept: "application/json",
            "Content-Type": "application/json",
        }

        response = await HttpMethods.postPet(url, body, headers);

        return response
    }

    static async putPet(response: Response): Promise<Response> {
        const url: string = `${BASE_URL}${PUT_RESOURCE}`;
        const body: Pet = {
            "id": 110,
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

        response = await HttpMethods.putPet(url, body, headers);

        return response
    }

    static async findPetById(response: Response): Promise<Response> {
        const url: string = `${BASE_URL}${GET_RESOURCE}`;
        const headers: Headers = {
            accept: "application/json",
        }

        response = await HttpMethods.getPet(url, headers);

        return response;
    }

    static async changePetStatus(response: Response): Promise<Response> {
        const url: string = `${BASE_URL}${POST_RESOURCE}/110`;
        const headers: Headers = {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        }
        const body: statusBody = {
            status: "available"
        }

        response = await HttpMethods.postPetStatus(url, headers, body);

        return response;
    }

    static async deletePetById(response: Response): Promise<Response> {
        const url: string = `${BASE_URL}${DELETE_RESOURCE}/110`;
        const headers: Headers = {
            accept: "application/json",
            "api_key": "special-key",
        }

        response = await HttpMethods.deletePet(url, headers);

        return response;
    }
}
