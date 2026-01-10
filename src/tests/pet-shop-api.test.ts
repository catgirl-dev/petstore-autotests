import {PetStoreAPI} from "../api/client";
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';

const petId: number = 10;

describe("E2E Pet Lyfecycle", () => {
    it("Проверка жизненного цикла питомца в зоомагазине", async () => {
        // Добавление питомца
        const addResponse: Response = await PetStoreAPI.addPet(petId);
        const addResponseJson = await addResponse.json();
        expect(addResponse.status).toBe(200);
        expect(addResponse.headers.get("content-type")).toBe("application/json");
        expect(addResponseJson.id).toBe(petId);

        // Получение информации о питомце после добавления
        const getAfterPostResponse: Response = await PetStoreAPI.findPetById(petId);
        const getAfterPostResponseJson = await getAfterPostResponse.json();
        expect(getAfterPostResponse.status).toBe(200);
        expect(getAfterPostResponse.headers.get("content-type")).toBe("application/json");
        expect(getAfterPostResponseJson.id).toBe(petId);

        // Изменение статуса питомца на sold
        const changePetStatusResponse: Response = await PetStoreAPI.putPet(petId);
        const changePetStatusResponseJson = await changePetStatusResponse.json();
        expect(changePetStatusResponse.status).toBe(200);
        expect(changePetStatusResponse.headers.get("content-type")).toBe("application/json");
        expect(changePetStatusResponseJson.id).toBe(petId);

        // Получение информации о питомце после изменения статуса
        const getAfterChangeStatusResponse: Response = await PetStoreAPI.findPetById(petId);
        const getAfterChangeStatusResponseJson = await getAfterChangeStatusResponse.json();
        expect(getAfterChangeStatusResponse.status).toBe(200);
        expect(getAfterChangeStatusResponse.headers.get("content-type")).toBe("application/json");
        // Проверяем, изменился ли статус на sold
        // expect(getAfterChangeStatusResponseJson.status).toBe("sold");

        // Удаление питомца
        const deletePetFromShopResponse: Response = await PetStoreAPI.deletePetById(petId);
        const deletePetFromShopResponseJson = await deletePetFromShopResponse.json();
        expect(deletePetFromShopResponse.status).toBe(200);
        expect(deletePetFromShopResponse.headers.get("content-type")).toBe("application/json");
        expect(deletePetFromShopResponseJson.id).toBe(petId);

        // Получение информации после удаления питомца
        const getAfterDeleteResponse: Response = await PetStoreAPI.findPetById(petId);
        expect(getAfterDeleteResponse.status).toBe(404);
        expect(getAfterDeleteResponse.headers.get("content-type")).toBe("application/json");
    })
})