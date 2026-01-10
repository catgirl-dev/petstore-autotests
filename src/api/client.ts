import {Headers, Pet} from "./types";
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
}

